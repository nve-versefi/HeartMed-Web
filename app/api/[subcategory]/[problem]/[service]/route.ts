import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { subcategory: string; problem: string; service: string } }
) {
  //console.log('API Route Called');
  //console.log('Request Params:', params);

  const { subcategory, problem, service: queryService } = params;

  try {
    //console.log('Attempting to connect to MongoDB...');
    const client = await connect();
    //console.log('MongoDB connected successfully');

    const db = client.db(process.env.DB_NAME);
    //console.log('Using database:', process.env.DB_NAME);

    const collection = db.collection('Tratamientos');
    //console.log('Accessing collection: Tratamientos');

    await collection.createIndex({ title: "text" });

    //console.log('Preparing search query for service:', queryService);

    const query = {
      subcategory: subcategory,
      objectives: { $in: [problem] },
      $text: { $search: queryService }
    };

    const projection = {
      score: { $meta: "textScore" }
    };

    //console.log('MongoDB Query:', JSON.stringify(query, null, 2));

    //console.log('Executing MongoDB query...');
    const cursor = collection.find(query, { projection }).sort({ score: { $meta: "textScore" } });
    const serviceData = await cursor.limit(1).next();

    //console.log('MongoDB Query Result:', serviceData);

    if (!serviceData) {
      console.error('No service data found for the given parameters.');
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    // You can set a threshold for the score if needed
    const scoreThreshold = 0.5; // Adjust this value as needed
    if (serviceData.score < scoreThreshold) {
      //console.log('Match found but score too low:', serviceData.score);
      return NextResponse.json({ message: 'No close match found' }, { status: 404 });
    }

    //console.log('Service data found with score:', serviceData.score);
    return NextResponse.json(serviceData);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'Error fetching service data', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    //console.log('API route execution completed');
  }
}