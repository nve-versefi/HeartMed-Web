import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await connect();
            const db = client.db('Web');
            const menuItemsCollection = db.collection('menuItems');

            const antiAgingData = await menuItemsCollection.findOne(
                { title: "Medicina Regenerativa" },
                { projection: { _id: 0, submenu: 1, title: 1 } }
            );

            if (!antiAgingData) {
                return res.status(404).json({ error: 'Medicina Regenerativa data not found' });
            }

            //console.log('Medicina Regenerativa data fetched:', antiAgingData);
            res.status(200).json(antiAgingData);
        } catch (error) {
            console.error('Failed to fetch Medicina Regenerativa data:', error);
            res.status(500).json({ error: 'Failed to fetch Medicina Regenerativa data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}