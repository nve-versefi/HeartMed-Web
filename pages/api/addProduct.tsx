import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

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

const handler = async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await new Promise<void>((resolve, reject) => {
        upload.fields([
          { name: 'thumbnail', maxCount: 1 },
          { name: 'image1', maxCount: 1 },
          { name: 'image2', maxCount: 1 },
        ])(req as any, res as any, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      const {
        title,
        description,
        category,
        activeIngredient,
        brand,
        useCase,
        price,
      } = req.body;

      const thumbnailFile = req.files?.['thumbnail']?.[0];
      const image1File = req.files?.['image1']?.[0];
      const image2File = req.files?.['image2']?.[0];

      const thumbnail = convertFileToBase64(thumbnailFile);
      const image1 = convertFileToBase64(image1File);
      const image2 = convertFileToBase64(image2File);

      const newProduct = {
        title,
        description,
        category,
        thumbnail,
        activeIngredient,
        brand,
        useCase,
        price: parseFloat(price),
        thumbnailTitle: thumbnailFile ? thumbnailFile.originalname : '',
        image1Title: image1File ? image1File.originalname : '',
        image2Title: image2File ? image2File.originalname : '',
        image1,
        image2,
      };

      const client: MongoClient = await connect();
      const db = client.db(process.env.DB_NAME);
      const productsCollection = db.collection('products');
      const result = await productsCollection.insertOne(newProduct);

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
