import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    try {
      const menuItems = await collection.find({}).toArray();
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Error fetching menu data:', error);
      res.status(500).json({ message: 'Error fetching menu data' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}