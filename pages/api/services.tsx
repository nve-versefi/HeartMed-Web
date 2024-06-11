import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

let cachedClient: MongoClient | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { title, objectives, subcategory } = req.query;
            console.log('Received query params:', { title, objectives, subcategory });

            // Start time for logging
            const startTime = Date.now();

            if (!cachedClient) {
                console.log('Connecting to database...');
                cachedClient = await connect();
            }
            const client = cachedClient;
            const db = client.db('Web');
            const servicesCollection = db.collection('Tratamientos');

            // Construct the query object based on the parameters
            const query: any = {};
            if (title) query.title = title;
            if (objectives) query.objectives = { $in: [objectives] };
            if (subcategory) query.subcategory = subcategory;

            console.log('Constructed query:', query);

            // Fetch the document that matches the query
            const serviceStartTime = Date.now();
            const service = await servicesCollection.findOne(query);

            console.log('Service fetch duration:', Date.now() - serviceStartTime, 'ms');
            console.log('Total duration:', Date.now() - startTime, 'ms');

            if (!service) {
                return res.status(404).json({ error: 'Service not found' });
            }

            console.log('Service fetched:', service);

            res.status(200).json({ service });
        } catch (error) {
            console.error('Failed to fetch service:', error);
            res.status(500).json({ error: 'Failed to fetch service' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
