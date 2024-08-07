import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';
import { MongoClient } from 'mongodb';

const convertFileToBase64 = async (file: File | null): Promise<string> => {
  if (!file) return '';
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const trainer = formData.get('trainer') as string;
    const duration = parseFloat(formData.get('duration') as string);
    const price = parseFloat(formData.get('price') as string);
    const date = formData.get('date') as string;

    const image1File = formData.get('image1') as File | null;
    const image2File = formData.get('image2') as File | null;

    const image1 = await convertFileToBase64(image1File);
    const image2 = await convertFileToBase64(image2File);

    const image1Title = image1File?.name || '';
    const image2Title = image2File?.name || '';

    const training = {
      title,
      description,
      category,
      trainer,
      duration,
      price,
      date,
      image1Title,
      image2Title,
      image1,
      image2,
    };

    const client: MongoClient = await connect();
    const db = client.db('Web');
    const trainingsCollection = db.collection('Formaciones');
    const result = await trainingsCollection.insertOne(training);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to add training:', error);
    return NextResponse.json({ error: 'Failed to add training' }, { status: 500 });
  }
}