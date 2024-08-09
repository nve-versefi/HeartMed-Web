import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function GET() {
  try {
    const client: MongoClient = await connect();
    const db = client.db(process.env.DB_NAME);
    const carouselCollection = db.collection('carousel');
    
    const carouselItems = await carouselCollection.find({}).toArray();
    
    return NextResponse.json(carouselItems);
  } catch (error) {
    console.error('Failed to fetch carousel items:', error);
    return NextResponse.json({ error: 'Failed to fetch carousel items' }, { status: 500 });
  }
}