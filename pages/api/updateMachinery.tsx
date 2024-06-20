import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/mongodb';
import multer from 'multer';
import { MongoClient, ObjectId } from 'mongodb';

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
    if (req.method === 'PUT') {
        try {
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

            const {
                _id,
                title,
                description,
                category,
                brand,
                status,
                price,
                rentalPrice
            } = req.body;

            const image1File = req.files?.['image1']?.[0];
            const image2File = req.files?.['image2']?.[0];

            const image1 = convertFileToBase64(image1File);
            const image2 = convertFileToBase64(image2File);

            const image1Title = getFileName(image1File);
            const image2Title = getFileName(image2File);

            const client: MongoClient = await connect();
            const db = client.db('Web');
            const machineriesCollection = db.collection('Maquinaria');

            const updateFields: any = {
                title,
                description,
                category,
                brand,
                status,
                price: parseFloat(price),
                rentalPrice: parseFloat(rentalPrice),
            };

            if (image1) {
                updateFields.image1 = image1;
                updateFields.image1Title = image1Title;
            }
            if (image2) {
                updateFields.image2 = image2;
                updateFields.image2Title = image2Title;
            }

            const result = await machineriesCollection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: updateFields }
            );

            res.status(200).json(result);
        } catch (error) {
            console.error('Failed to update machinery:', error);
            res.status(500).json({ error: 'Failed to update machinery' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
