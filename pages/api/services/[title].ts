import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { title } = req.query;
      console.log('Received title:', title); // Log the title received

      const client = await connect();
      const db = client.db('Web');
      const servicesCollection = db.collection('Tratamientos');

      const query = {
        $or: [
          { title: title as string },
          { objectives: title as string },
          { category: title as string },
          { subcategory: title as string }
        ]
      };
      console.log('Query:', query); // Log the query

      const service = await servicesCollection.findOne(query);
      console.log('Service found:', service); // Log the service found

      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (error) {
      console.error('Failed to fetch service:', error);
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
