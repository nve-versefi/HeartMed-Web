import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId, Document } from 'mongodb';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { level, parentId, problemId } = req.query;
  const itemData = req.body;

  console.log('Received request:', { level, parentId, problemId, itemData });

  if (!level || Array.isArray(level)) {
    return res.status(400).json({ message: 'Missing or invalid required parameter: level' });
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
        result = await collection.insertOne({
          title: itemData.title,
          path: itemData.path,
          image: itemData.image,
          newTab: itemData.newTab === 'true',
          submenu: []
        });
        break;

        case 'submenu':
        if (!parentIdString) {
          return res.status(400).json({ message: 'Missing required parameter: parentId for submenu' });
        }
        
        let query;
        if (ObjectId.isValid(parentIdString)) {
          query = { _id: new ObjectId(parentIdString) };
        } else {
          const parentIdInt = parseInt(parentIdString, 10);
          if (isNaN(parentIdInt)) {
            return res.status(400).json({ message: 'Invalid parentId: must be a valid ObjectId or an integer' });
          }
          query = { id: parentIdInt };
        }

        result = await collection.updateOne(
          query,
          {
            $push: {
              submenu: {
                name: itemData.title,
                path: itemData.path,
                imagePath: itemData.image,
                imageUrl: itemData.image,
                problems: []
              } as any // Type assertion to bypass TypeScript's strict checking
            }
          }
        );
        break;

      case 'problem':
        if (!parentIdString) {
          return res.status(400).json({ message: 'Missing required parameter: parentId for problem' });
        }
        result = await collection.updateOne(
          { "submenu.name": parentIdString },
          {
            $push: {
              "submenu.$.problems": {
                name: itemData.title,
                imageUrl: itemData.image,
                services: []
              }
            } as any
          }
        );
        break;

      case 'service':
        if (!parentIdString || !problemIdString) {
          return res.status(400).json({ message: 'Missing required parameters: parentId and problemId for service' });
        }
        console.log('Attempting to add service:', { parentIdString, problemIdString, itemData });
        
        result = await collection.updateOne(
          { "submenu.name": parentIdString, "submenu.problems.name": problemIdString },
          {
            $push: {
              "submenu.$[submenu].problems.$[problem].services": {
                serviceName: itemData.title,
                servicePath: itemData.path
              }
            } as any
          },
          {
            arrayFilters: [
              { "submenu.name": parentIdString },
              { "problem.name": problemIdString }
            ]
          }
        );
        console.log('Service addition result:', result);
        break;

      default:
        return res.status(400).json({ message: `Invalid level: ${level}` });
    }

    console.log('Operation result:', result);

    if ('matchedCount' in result && result.matchedCount === 0) {
      return res.status(404).json({ message: 'Failed to add item: No matching document found' });
    }
    if ('modifiedCount' in result && result.modifiedCount === 0 && level !== 'menuItem') {
      return res.status(404).json({ message: 'Failed to add item: No document modified' });
    }

    res.status(200).json({ message: 'Item added successfully', result });
  } catch (error) {
    console.error('Error adding item:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: `Error adding item: ${error.message}` });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}