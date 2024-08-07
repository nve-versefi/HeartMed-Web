import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

const convertFileToBase64 = async (file: File | null): Promise<string> => {
  if (!file) return '';
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const activeIngredient = formData.get('activeIngredient') as string;
    const brand = formData.get('brand') as string;
    const useCase = formData.get('useCase') as string;
    const price = parseFloat(formData.get('price') as string);

    const thumbnailFile = formData.get('thumbnail') as File | null;
    const image1File = formData.get('image1') as File | null;
    const image2File = formData.get('image2') as File | null;

    const thumbnail = await convertFileToBase64(thumbnailFile);
    const image1 = await convertFileToBase64(image1File);
    const image2 = await convertFileToBase64(image2File);

    const newProduct = {
      title,
      description,
      category,
      thumbnail,
      activeIngredient,
      brand,
      useCase,
      price,
      thumbnailTitle: thumbnailFile?.name || '',
      image1Title: image1File?.name || '',
      image2Title: image2File?.name || '',
      image1,
      image2,
    };

    const client: MongoClient = await connect();
    const db = client.db(process.env.DB_NAME);
    const productsCollection = db.collection('products');
    const result = await productsCollection.insertOne(newProduct);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to add product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}