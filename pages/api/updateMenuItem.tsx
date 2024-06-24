import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { level, id, parentId, problemId } = req.query;
  const itemData = req.body;

  console.log('Received request:', { level, id, parentId, problemId, itemData });

  if (!level || Array.isArray(level)) {
    return res.status(400).json({ message: 'Missing or invalid required parameter: level' });
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Missing or invalid required parameter: id' });
  }

  // Ensure parentId and problemId are strings if present
  const parentIdString = Array.isArray(parentId) ? parentId[0] : parentId;
  const problemIdString = Array.isArray(problemId) ? problemId[0] : problemId;

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    // Log the entire document structure
    const allDocuments = await collection.find({}).toArray();
    console.log('Current document structure:', JSON.stringify(allDocuments, null, 2));

    let result;

    switch (level) {
      case 'menuItem':
        result = await collection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              title: itemData.title,
              path: itemData.path,
              image: itemData.image,
              newTab: itemData.newTab === 'true'
            }
          }
        );
        break;

      case 'submenu':
        if (!parentIdString) {
          return res.status(400).json({ message: 'Missing required parameter: parentId for submenu' });
        }

        result = await collection.updateOne(
          { _id: new ObjectId(parentIdString), 'submenu.name': id },
          {
            $set: {
              'submenu.$.name': itemData.title,
              'submenu.$.path': itemData.path,
              'submenu.$.imageUrl': itemData.image
            }
          }
        );
        break;

      case 'problem':
        if (!parentIdString) {
          return res.status(400).json({ message: 'Missing required parameter: parentId for problem' });
        }

        result = await collection.updateOne(
          { 'submenu.name': parentIdString, 'submenu.problems.name': id },
          {
            $set: {
              'submenu.$[submenu].problems.$[problem].name': itemData.title,
              'submenu.$[submenu].problems.$[problem].imageUrl': itemData.image
            }
          },
          {
            arrayFilters: [
              { 'submenu.name': parentIdString },
              { 'problem.name': id }
            ]
          }
        );
        break;

      case 'service':
        if (!parentIdString || !problemIdString) {
          return res.status(400).json({ message: 'Missing required parameters: parentId and problemId for service' });
        }

        result = await collection.updateOne(
          { 'submenu.name': parentIdString, 'submenu.problems.name': problemIdString, 'submenu.problems.services.serviceName': id },
          {
            $set: {
              'submenu.$[submenu].problems.$[problem].services.$[service].serviceName': itemData.title,
              'submenu.$[submenu].problems.$[problem].services.$[service].servicePath': itemData.path
            }
          },
          {
            arrayFilters: [
              { 'submenu.name': parentIdString },
              { 'problem.name': problemIdString },
              { 'service.serviceName': id }
            ]
          }
        );
        break;

      default:
        return res.status(400).json({ message: `Invalid level: ${level}` });
    }

    console.log('Operation result:', result);

    if ('matchedCount' in result && result.matchedCount === 0) {
      return res.status(404).json({ message: 'Failed to update item: No matching document found' });
    }
    if ('modifiedCount' in result && result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Failed to update item: No document modified' });
    }

    res.status(200).json({ message: 'Item updated successfully', result });
  } catch (error) {
    console.error('Error updating item:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: `Error updating item: ${error.message}` });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}