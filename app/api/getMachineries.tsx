import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const client = await connect();
            const db = client.db('Web');
            const machineriesCollection = db.collection('Maquinaria');

            if (id) {
                const machinery = await machineriesCollection.findOne(
                    { _id: new ObjectId(id as string) },
                    {
                        projection: {
                            title: 1,
                            description: 1,
                            category: 1,
                            brand: 1,
                            status: 1,
                            price: 1,
                            rentalPrice: 1,
                            image1Title: 1,
                            image2Title: 1,
                            image1: 1,
                            image2: 1,
                        }
                    }
                );

                if (!machinery) {
                    return res.status(404).json({ error: 'Machinery not found' });
                }

                machinery.price = parseFloat(machinery.price);
                machinery.rentalPrice = parseFloat(machinery.rentalPrice);

                console.log('Machinery fetched:', machinery);

                res.status(200).json({ machinery });
            } else {
                const machineries = await machineriesCollection.find({}, {
                    projection: {
                        title: 1,
                        description: 1,
                        category: 1,
                        brand: 1,
                        status: 1,
                        price: 1,
                        rentalPrice: 1,
                        image1Title: 1,
                        image2Title: 1,
                        image1: 1,
                        image2: 1,
                    }
                }).toArray();

                machineries.forEach(machinery => {
                    machinery.price = parseFloat(machinery.price);
                    machinery.rentalPrice = parseFloat(machinery.rentalPrice);
                });

                console.log('Machineries fetched:', machineries);
                res.status(200).json({ machineries });
            }
        } catch (error) {
            console.error('Failed to fetch machineries:', error);
            res.status(500).json({ error: 'Failed to fetch machineries' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
