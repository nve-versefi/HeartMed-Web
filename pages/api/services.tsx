// pages/api/services.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await connect();
      const db = client.db('Web');
      const servicesCollection = db.collection('Tratamientos');
      const services = await servicesCollection.find({}, { projection: { title: 1 } }).toArray();
      res.status(200).json({ services });
    } catch (error) {
      console.error('Failed to fetch services:', error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}