import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';
import { MongoClient, ObjectId } from 'mongodb';

const convertFileToBase64 = async (file: File | null): Promise<string> => {
  if (!file) return '';
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
};

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const _id = formData.get('_id') as string;
    const updateFields: any = {};

    [
      'title', 'category', 'subcategory', 'subtitle1', 'what', 'subtitle2', 'how', 'subtitle3',
      'area', 'time', 'anesthesia', 'finance', 'results', 'hospital', 'objective1', 'objective2',
      'extra', 'faq1', 'answer1', 'faq2', 'answer2', 'faq3', 'answer3', 'faq4', 'answer4',
      'faq5', 'answer5', 'faq6', 'answer6', 'faq7', 'answer7', 'faq8', 'answer8', 'faq9', 'answer9'
    ].forEach(field => {
      const value = formData.get(field);
      if (value !== null) updateFields[field] = value;
    });

    ['targetAreas', 'objectives', 'relatedProd'].forEach(field => {
      const value = formData.get(field);
      if (value !== null) {
        updateFields[field] = JSON.parse(value as string);
      }
    });

    for (let i = 1; i <= 3; i++) {
      const imageFile = formData.get(`image${i}`) as File | null;
      if (imageFile) {
        updateFields[`image${i}`] = await convertFileToBase64(imageFile);
        updateFields[`image${i}_title`] = imageFile.name;
      }
    }

    const client: MongoClient = await connect();
    const db = client.db(process.env.DB_NAME);
    const servicesCollection = db.collection('Tratamientos');

    const result = await servicesCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Failed to update service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
