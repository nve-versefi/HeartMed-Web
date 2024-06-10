import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log("Starting file upload processing...");
      await new Promise<void>((resolve, reject) => {
        upload.fields([
          { name: 'cover', maxCount: 1 },
          { name: 'image1', maxCount: 1 },
          { name: 'image2', maxCount: 1 },
          { name: 'image3', maxCount: 1 },
        ])(req, res, (err) => {
          if (err) {
            console.error("Multer error: ", err);
            reject(err);
          } else {
            console.log("File upload successful.");
            resolve();
          }
        });
      });

      const { title, category, subcategory, what, how, area, time, anesthesia, finance, results, objective1, objective2, extra, faq1, answer1, faq2, answer2, faq3, answer3, faq4, answer4, faq5, answer5, faq6, answer6, faq7, answer7, faq8, answer8, faq9, answer9, targetAreas, objectives, relatedProd } = req.body;

      const convertFileToBase64 = (file: Express.Multer.File | undefined): string => {
        if (!file) return '';
        console.log(`Converting file to base64: ${file.originalname}`);
        return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      };
      const cover = convertFileToBase64(req.files?.['cover']?.[0]);
      const image1 = convertFileToBase64(req.files?.['image1']?.[0]);
      const image2 = convertFileToBase64(req.files?.['image2']?.[0]);
      const image3 = convertFileToBase64(req.files?.['image3']?.[0]);

      console.log("Images converted to base64 successfully.");

      const service = {
        title,
        category,
        subcategory,
        cover,
        image1,
        image2,
        image3,
        what,
        how,
        area,
        time,
        anesthesia,
        finance,
        results,
        objective1,
        objective2,
        extra,
        faq1,
        answer1,
        faq2,
        answer2,
        faq3,
        answer3,
        faq4,
        answer4,
        faq5,
        answer5,
        faq6,
        answer6,
        faq7,
        answer7,
        faq8,
        answer8,
        faq9,
        answer9,
        targetAreas: Array.isArray(targetAreas) ? targetAreas : [],
        objectives: Array.isArray(objectives) ? objectives : [],
        relatedProd: Array.isArray(relatedProd) ? relatedProd : [],
      };

      console.log("Service object created:", service);

      const client = await connect();
      const db = client.db('Web');
      const servicesCollection = db.collection('Tratamientos');
      const result = await servicesCollection.insertOne(service);
      console.log("Service added to the database successfully.");
      res.status(201).json(result);
    } catch (error) {
      console.error('Failed to add service:', error);
      res.status(500).json({ error: 'Failed to add service' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
