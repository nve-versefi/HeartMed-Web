import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const buttonText = formData.get('buttonText') as string;
    const order = parseInt(formData.get('order') as string);
    const imageFile = formData.get('image') as File | null;

    const newCarouselItem: any = {
      title,
      buttonText,
      order,
    };

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString('base64');
      newCarouselItem.imageUrl = `data:${imageFile.type};base64,${base64Image}`;
    }

    const client: MongoClient = await connect();
    const db = client.db(process.env.DB_NAME);
    const carouselCollection = db.collection('carousel');
    const result = await carouselCollection.insertOne(newCarouselItem);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to add carousel item:', error);
    return NextResponse.json({ error: 'Failed to add carousel item' }, { status: 500 });
  }
}