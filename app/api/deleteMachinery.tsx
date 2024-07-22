// pages/api/deleteMachinery.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const client = await connect();
      const db = client.db('Web');
      const machineriesCollection = db.collection('Maquinaria');
      const result = await machineriesCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Machinery deleted successfully' });
      } else {
        res.status(404).json({ error: 'Machinery not found' });
      }
    } catch (error) {
      console.error('Failed to delete machinery:', error);
      res.status(500).json({ error: 'Failed to delete machinery' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
