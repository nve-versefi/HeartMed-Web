import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const client = await connect();
            const db = client.db('Web');
            const trainingsCollection = db.collection('Formaciones');

            if (id) {
                const training = await trainingsCollection.findOne(
                    { _id: new ObjectId(id as string) },
                    {
                        projection: {
                            title: 1,
                            description: 1,
                            category: 1,
                            trainer: 1,
                            duration: 1,
                            price: 1,
                            date: 1,
                            image1Title: 1,
                            image2Title: 1,
                            image1: 1,
                            image2: 1,
                        }
                    }
                );

                if (!training) {
                    return res.status(404).json({ error: 'Training not found' });
                }

                training.price = parseFloat(training.price);

                console.log('Training fetched:', training);

                res.status(200).json({ training });
            } else {
                const trainings = await trainingsCollection.find({}, {
                    projection: {
                        title: 1,
                        description: 1,
                        category: 1,
                        trainer: 1,
                        duration: 1,
                        price: 1,
                        date: 1,
                        image1Title: 1,
                        image2Title: 1,
                        image1: 1,
                        image2: 1,
                    }
                }).toArray();

                trainings.forEach(training => {
                    training.price = parseFloat(training.price);
                });

                console.log('Trainings fetched:', trainings);
                res.status(200).json({ trainings });
            }
        } catch (error) {
            console.error('Failed to fetch trainings:', error);
            res.status(500).json({ error: 'Failed to fetch trainings' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
