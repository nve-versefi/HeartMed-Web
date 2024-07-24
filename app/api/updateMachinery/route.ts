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
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const brand = formData.get('brand') as string;
    const status = formData.get('status') as string;
    const price = parseFloat(formData.get('price') as string);
    const rentalPrice = parseFloat(formData.get('rentalPrice') as string);

    const image1File = formData.get('image1') as File | null;
    const image2File = formData.get('image2') as File | null;

    const updateFields: any = {
      title,
      description,
      category,
      brand,
      status,
      price,
      rentalPrice,
    };

    if (image1File) {
      updateFields.image1 = await convertFileToBase64(image1File);
      updateFields.image1Title = image1File.name;
    }
    if (image2File) {
      updateFields.image2 = await convertFileToBase64(image2File);
      updateFields.image2Title = image2File.name;
    }

    const client: MongoClient = await connect();
    const db = client.db('Web');
    const machineriesCollection = db.collection('Maquinaria');

    const result = await machineriesCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Failed to update machinery:', error);
    return NextResponse.json({ error: 'Failed to update machinery' }, { status: 500 });
  }
}