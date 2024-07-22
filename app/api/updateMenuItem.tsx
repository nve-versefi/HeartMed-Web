import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { level, id, parentId, problemId } = req.query;
  const itemData = req.body;

  console.log('Received request:', { level, id, parentId, problemId, itemData });

  if (!level || Array.isArray(level) || !id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Missing or invalid required parameters: level and id' });
  }

  const parentIdString = Array.isArray(parentId) ? parentId[0] : parentId;
  const problemIdString = Array.isArray(problemId) ? problemId[0] : problemId;

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    let result;

    switch (level) {
      case 'menuItem':
        result = await collection.updateOne(
          { id: parseInt(id) },
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
          { id: parseInt(parentIdString), 'submenu.name': id },
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

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Item not found. No update performed.' });
    }
    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: 'Item found, but no changes were needed.' });
    }

    res.status(200).json({ message: 'Item updated successfully', result });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: `Error updating item: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
}