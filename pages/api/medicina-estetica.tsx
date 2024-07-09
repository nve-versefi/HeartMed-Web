import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await connect();
            const db = client.db('Web');
            const menuItemsCollection = db.collection('menuItems');

            const medicinaEsteticaData = await menuItemsCollection.findOne(
                { title: "Medicina Estética" },
                { projection: { _id: 0, submenu: 1 } }
            );

            if (!medicinaEsteticaData) {
                return res.status(404).json({ error: 'Medicina Estética data not found' });
            }

            //console.log('Medicina Estética data fetched:', medicinaEsteticaData);
            res.status(200).json(medicinaEsteticaData.submenu);
        } catch (error) {
            console.error('Failed to fetch Medicina Estética data:', error);
            res.status(500).json({ error: 'Failed to fetch Medicina Estética data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}