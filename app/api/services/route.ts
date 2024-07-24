import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

let cachedClient: MongoClient | null = null;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const objectives = searchParams.get('objectives');
    const subcategory = searchParams.get('subcategory');
    const targetAreas = searchParams.get('targetAreas');

    console.log('Received query params:', { title, objectives, subcategory, targetAreas });

    const startTime = Date.now();

    try {
      if (!cachedClient) {
        console.log('Connecting to database...');
        cachedClient = await connect();
      }
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    const client = cachedClient;
    const db = client.db('Web');
    const servicesCollection = db.collection('Tratamientos');

    const query: any = {};
    if (title) query.title = title;
    if (objectives) query.objectives = { $in: [objectives] };
    if (targetAreas) query.targetAreas = { $in: [targetAreas] };
    if (subcategory) query.subcategory = subcategory;

    console.log('Constructed query:', query);

    const serviceStartTime = Date.now();
    let service;
    try {
      service = await servicesCollection.findOne(query);
    } catch (error) {
      console.error('Failed to execute the database query:', error);
      return NextResponse.json({ error: 'Failed to execute the database query' }, { status: 500 });
    }

    console.log('Service fetch duration:', Date.now() - serviceStartTime, 'ms');
    console.log('Total duration:', Date.now() - startTime, 'ms');

    if (!service) {
      console.log('Service not found');
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    console.log('Service fetched:', service);

    return NextResponse.json({ service });
  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });
  }
}