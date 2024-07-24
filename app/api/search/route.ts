import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 3) {
    return NextResponse.json(
      { message: 'Search query must be at least 3 characters long' },
      { status: 400 }
    );
  }

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('Tratamientos');

    const searchResults = await collection.find(
      {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { subcategory: { $regex: q, $options: 'i' } },
          { objectives: { $regex: q, $options: 'i' } }
        ]
      },
      {
        projection: {
          _id: 1,
          title: 1,
          subcategory: 1,
          objectives: 1
        }
      }
    ).limit(10).toArray();

    return NextResponse.json(searchResults);
  } catch (error: unknown) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { 
        message: 'Error performing search', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}