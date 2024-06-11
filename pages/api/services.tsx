import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { title, objectives, subcategory } = req.query;
      console.log('Received query params:', { title, objectives, subcategory });

      const startTime = Date.now();

      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME);
      const servicesCollection = db.collection('Tratamientos');

      // Ensure indexes on the queried fields
      await servicesCollection.createIndex({ title: 1 });
      await servicesCollection.createIndex({ objectives: 1 });
      await servicesCollection.createIndex({ subcategory: 1 });

      const query: any = {
        $and: []
      };

      if (title) {
        query.$and.push({ title: title as string });
      }
      if (objectives) {
        query.$and.push({ objectives: { $in: [objectives as string] } });
      }
      if (subcategory) {
        query.$and.push({ subcategory: subcategory as string });
      }

      console.log('Query:', query);

      const fetchStartTime = Date.now();
      const services = await servicesCollection.find(query, {
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
      }).toArray();

      const fetchEndTime = Date.now();
      console.log('Data fetching time:', fetchEndTime - fetchStartTime, 'ms');

      if (services.length === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const endTime = Date.now();
      console.log('Total execution time:', endTime - startTime, 'ms');

      res.status(200).json({ services });
    } catch (error) {
      console.error('Failed to fetch service:', error);
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
