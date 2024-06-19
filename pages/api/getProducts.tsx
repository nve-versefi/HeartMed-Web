import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const client = await connect();
            const db = client.db('Web');
            const productsCollection = db.collection('products');

            if (id) {
                const product = await productsCollection.findOne(
                    { _id: new ObjectId(id as string) },
                    {
                        projection: {
                            title: 1,
                            description: 1,
                            category: 1,
                            thumbnail: 1,
                            activeIngredient: 1,
                            brand: 1,
                            useCase: 1,
                            price: 1,
                            image1: 1,
                            image2: 1
                        }
                    }
                );

                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }

                product.price = parseFloat(product.price);

                console.log('Product fetched:', product);

                res.status(200).json({ product });
            } else {
                const products = await productsCollection.find({}, {
                    projection: {
                        title: 1,
                        description: 1,
                        category: 1,
                        thumbnail: 1,
                        activeIngredient: 1,
                        brand: 1,
                        useCase: 1,
                        price: 1,
                        image1: 1,
                        image2: 1
                    }
                }).toArray();

                products.forEach(product => {
                    product.price = parseFloat(product.price);
                });

                console.log('Products fetched:', products);
                res.status(200).json({ products });
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
