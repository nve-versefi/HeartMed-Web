import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { subcategory: string; problem: string; service: string } }
) {
  console.log('Request Params:', params);

  const { subcategory, problem, service: queryService } = params;

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('Tratamientos');

    const cursor = collection.find({
      subcategory: subcategory,
      objectives: { $in: [problem] },
      $text: { $search: queryService }
    }, {
      projection: { score: { $meta: "textScore" } }
    }).sort({ score: { $meta: "textScore" } });

    const serviceData = await cursor.limit(1).next();

    console.log('MongoDB Query Result:', serviceData);

    if (!serviceData) {
      console.error('No service data found for the given parameters.');
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(serviceData);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ message: 'Error fetching service data' }, { status: 500 });
  }
}