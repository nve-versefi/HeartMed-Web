import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';
import { MongoClient } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const brand = formData.get('brand') as string;
    const status = formData.get('status') as string;
    const price = parseFloat(formData.get('price') as string);
    const rentalPrice = parseFloat(formData.get('rentalPrice') as string);

    const image1File = formData.get('image1') as File | null;
    const image2File = formData.get('image2') as File | null;

    const convertFileToBase64 = async (file: File | null): Promise<string> => {
      if (!file) return '';
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      return `data:${file.type};base64,${base64}`;
    };

    const image1 = await convertFileToBase64(image1File);
    const image2 = await convertFileToBase64(image2File);

    const image1Title = image1File?.name || '';
    const image2Title = image2File?.name || '';

    const machinery = {
      title,
      description,
      category,
      brand,
      status,
      price,
      rentalPrice,
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
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to add machinery:', error);
    return NextResponse.json({ error: 'Failed to add machinery' }, { status: 500 });
  }
}