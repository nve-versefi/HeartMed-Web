import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';
import multer from 'multer';
import { MongoClient } from 'mongodb';

interface NextApiRequestWithFiles extends NextApiRequest {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const convertFileToBase64 = (file: Express.Multer.File | undefined): string => {
  if (!file) return '';
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
};

const getFileName = (file: Express.Multer.File | undefined): string => {
  return file ? file.originalname : '';
};

const handler = async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      console.log("Starting file upload processing...");

      await new Promise<void>((resolve, reject) => {
        upload.fields([
          { name: 'image1', maxCount: 1 },
          { name: 'image2', maxCount: 1 },
        ])(req as any, res as any, (err) => {
          if (err) {
            console.error("Multer error: ", err);
            reject(err);
          } else {
            console.log("File upload successful.");
            resolve();
          }
        });
      });

      const { title, description, category, brand, status, price, rentalPrice } = req.body;

      const image1File = req.files?.['image1']?.[0];
      const image2File = req.files?.['image2']?.[0];

      const image1 = convertFileToBase64(image1File);
      const image2 = convertFileToBase64(image2File);

      const image1Title = getFileName(image1File);
      const image2Title = getFileName(image2File);

      console.log("Images converted to base64 successfully.");

      const machinery = {
        title,
        description,
        category,
        brand,
        status,
        price: parseFloat(price),
        rentalPrice: parseFloat(rentalPrice),
        image1Title,
        image2Title,
        image1,
        image2,
      };

      console.log("Machinery object created:", machinery);

      const client: MongoClient = await connect();
      const db = client.db('Web');
      const machineriesCollection = db.collection('Maquinaria');
      const result = await machineriesCollection.insertOne(machinery);
      console.log("Machinery added to the database successfully.");
      res.status(201).json(result);
    } catch (error) {
      console.error('Failed to add machinery:', error);
      res.status(500).json({ error: 'Failed to add machinery' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
