import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';
import { corsMiddleware } from '../cors';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; 

async function fetchMenuItemsWithRetry(retries = MAX_RETRIES): Promise<any[]> {
  try {
    //console.log(`Attempting to connect to MongoDB (retries left: ${retries})...`);
    const client = await connect();
    //console.log('Connected to MongoDB successfully');

    const db = client.db(process.env.DB_NAME);
    //console.log('Accessing database...');

    const collection = db.collection('menuItems');
    //console.log('Accessing collection...');

    const menuItems = await collection.find({}).toArray();
    //console.log(`Fetched ${menuItems.length} menu items successfully`);

    await client.close();
    //console.log('Closed MongoDB connection');

    return menuItems;
  } catch (error) {
    //console.error(`Error fetching menu data (retries left: ${retries}):`, error);
    if (retries > 0) {
      //console.log(`Retrying in ${RETRY_DELAY}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchMenuItemsWithRetry(retries - 1);
    }
    throw error;
  }
}

export async function GET() {
  try {
    const menuItems = await fetchMenuItemsWithRetry();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('All retries failed. Error fetching menu data:', error);
    return NextResponse.json(
      { message: 'Error fetching menu data', error: (error as Error).message },
      { status: 500 }
    );
  }
}