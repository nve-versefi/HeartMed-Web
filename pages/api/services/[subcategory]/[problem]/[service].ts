import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subcategory, problem, service: queryService } = req.query;
  console.log('Request Query:', req.query);

  if (req.method === 'GET') {
    try {
      const client = await connect();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('Tratamientos');

      if (typeof queryService !== 'string') {
        console.error('Service parameter must be a single string.');
        return res.status(400).json({ message: 'Invalid service parameter' });
      }

      // Use find() to get a cursor, then sort and limit to get the top result
      const cursor = collection.find({
        subcategory: subcategory,
        objectives: { $in: [problem] },
        $text: { $search: queryService }
      }, {
        projection: { score: { $meta: "textScore" } }
      }).sort({ score: { $meta: "textScore" } });  // Sort by text match score

      const serviceData = await cursor.limit(1).next();  // Get the most relevant document

      console.log('MongoDB Query Result:', serviceData);

      if (!serviceData) {
        console.error('No service data found for the given parameters.');
        return res.status(404).json({ message: 'Service not found' });
      }

      res.status(200).json(serviceData);
    } catch (error) {
      console.error('Error fetching service:', error);
      res.status(500).json({ message: 'Error fetching service data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
