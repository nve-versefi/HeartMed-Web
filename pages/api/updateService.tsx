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
                    { name: 'image3', maxCount: 1 },
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
                category,
                subcategory,
                what,
                how,
                area,
                time,
                anesthesia,
                finance,
                results,
                hospital,
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
                targetAreas,
                objectives,
                relatedProd,
            } = req.body;

            const image1File = req.files?.['image1']?.[0];
            const image2File = req.files?.['image2']?.[0];
            const image3File = req.files?.['image3']?.[0];

            const image1 = convertFileToBase64(image1File);
            const image2 = convertFileToBase64(image2File);
            const image3 = convertFileToBase64(image3File);

            const image1_title = getFileName(image1File);
            const image2_title = getFileName(image2File);
            const image3_title = getFileName(image3File);

            const client: MongoClient = await connect();
            const db = client.db('Web');
            const servicesCollection = db.collection('Tratamientos');

            const updateFields: any = {
                title,
                category,
                subcategory,
                what,
                how,
                area,
                time,
                anesthesia,
                finance,
                results,
                hospital,
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
                targetAreas: Array.isArray(targetAreas) ? targetAreas : JSON.parse(targetAreas),
                objectives: Array.isArray(objectives) ? objectives : JSON.parse(objectives),
                relatedProd: Array.isArray(relatedProd) ? relatedProd : JSON.parse(relatedProd),
            };

            if (image1) {
                updateFields.image1 = image1;
                updateFields.image1_title = image1_title;
            }
            if (image2) {
                updateFields.image2 = image2;
                updateFields.image2_title = image2_title;
            }
            if (image3) {
                updateFields.image3 = image3;
                updateFields.image3_title = image3_title;
            }

            const result = await servicesCollection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: updateFields }
            );

            res.status(200).json(result);
        } catch (error) {
            console.error('Failed to update service:', error);
            res.status(500).json({ error: 'Failed to update service' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
