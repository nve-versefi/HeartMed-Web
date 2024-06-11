import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

let cachedClient: MongoClient | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { title, objectives, subcategory } = req.query;
            console.log('Received query params:', { title, objectives, subcategory });

            if (!cachedClient) {
                cachedClient = await connect();
            }
            const client = cachedClient;
            const db = client.db('Web');
            const servicesCollection = db.collection('Tratamientos');

            const query: any = {};
            if (title) query.title = title;
            if (objectives) query.objectives = { $in: [objectives] };
            if (subcategory) query.subcategory = subcategory;

            console.log('Query:', query);

            const service = await servicesCollection.findOne(query, {
                projection: {
                    title: 1,
                    category: 1,
                    subcategory: 1,
                    cover: 1,
                    image1: 1,
                    image2: 1,
                    image3: 1,
                    what: 1,
                    anesthesia: 1,
                    time: 1,
                    finance: 1,
                    results: 1,
                    hospital: 1,
                    how: 1,
                    area: 1,
                    objective1: 1,
                    objective2: 1,
                    extra: 1,
                    faq1: 1,
                    answer1: 1,
                    faq2: 1,
                    answer2: 1,
                    faq3: 1,
                    answer3: 1,
                    faq4: 1,
                    answer4: 1,
                    faq5: 1,
                    answer5: 1,
                    faq6: 1,
                    answer6: 1,
                    faq7: 1,
                    answer7: 1,
                    faq8: 1,
                    answer8: 1,
                    faq9: 1,
                    answer9: 1,
                    targetAreas: 1,
                    objectives: 1,
                    relatedProd: 1,
                }
            });

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
