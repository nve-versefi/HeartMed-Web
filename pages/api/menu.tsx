import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

let cachedClient:any = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      if (!cachedClient) {
        cachedClient = await connect();
      }
      const db = cachedClient.db(process.env.DB_NAME);
      const collection = db.collection('menuItems');
      const menuItems = await collection.find({}).toArray();
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Error fetching menu data:', error);
      res.status(500).json({ message: 'Error fetching menu data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}