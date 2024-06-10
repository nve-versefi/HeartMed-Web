// pages/api/services/[title].ts
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { title } = req.query;
      const client = await connect();
      const db = client.db('Web');
      const servicesCollection = db.collection('Tratamientos');
      const service = await servicesCollection.findOne({ title: title as string });
      res.status(200).json(service);
    } catch (error) {
      console.error('Failed to fetch service:', error);
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}