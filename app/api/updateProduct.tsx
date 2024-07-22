import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { ObjectId } from 'mongodb';
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
  if (req.method === 'PUT') {
    try {
      await new Promise<void>((resolve, reject) => {
        upload.fields([
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
        _id,
        title,
        description,
        category,
        thumbnail,
        activeIngredient,
        brand,
        useCase,
        price,
      } = req.body;

      const image1File = req.files?.['image1']?.[0];
      const image2File = req.files?.['image2']?.[0];

      const image1 = convertFileToBase64(image1File);
      const image2 = convertFileToBase64(image2File);

      const updateFields: any = {
        title,
        description,
        category,
        thumbnail,
        activeIngredient,
        brand,
        useCase,
        price,
      };

      if (image1) {
        updateFields.image1 = image1;
      }
      if (image2) {
        updateFields.image2 = image2;
      }

      const client = await connect();
      const db = client.db(process.env.DB_NAME);
      const productsCollection = db.collection('products');

      const result = await productsCollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateFields }
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
