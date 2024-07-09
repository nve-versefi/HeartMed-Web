import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { q } = req.query;

    if (!q || (typeof q === 'string' && q.length < 3)) {
      return res.status(400).json({ message: 'Search query must be at least 3 characters long' });
    }

    try {
      const client = await connect();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection('Tratamientos');

      const searchResults = await collection.find(
        {
          $or: [
            { title: { $regex: q as string, $options: 'i' } },
            { subcategory: { $regex: q as string, $options: 'i' } },
            { objectives: { $regex: q as string, $options: 'i' } }
          ]
        },
        {
          projection: {
            _id: 1,
            title: 1,
            subcategory: 1,
            objectives: 1
          }
        }
      ).limit(10).toArray();

      res.status(200).json(searchResults);
    } catch (error: unknown) {
      console.error('Error in search API:', error);
      res.status(500).json({ message: 'Error performing search', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}