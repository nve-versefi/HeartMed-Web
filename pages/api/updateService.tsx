import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust the size limit as needed
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const client = await connect();
      const db = client.db('Web');
      const servicesCollection = db.collection('Tratamientos');
      const { _id, ...service } = req.body;

      console.log('Updating service with ID:', _id);
      const result = await servicesCollection.updateOne(
        { _id: new ObjectId(_id) }, // Convert _id to ObjectId
        { $set: service }
      );
      console.log('Update result:', result);

      if (result.matchedCount === 0) {
        res.status(404).json({ error: 'Service not found' });
      } else {
        res.status(200).json({ message: 'Service updated successfully' });
      }
    } catch (error) {
      console.error('Failed to update service:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
