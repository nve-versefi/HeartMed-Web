import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  //console.log('API route called with productId:', params.productId);

  const { productId } = params;

  if (!productId) {
    console.error('Product ID is missing');
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    //console.log('Attempting to connect to database...');
    const client = await connect();
    //console.log('Connected to database successfully');

    const db = client.db(process.env.DB_NAME);
    //console.log('Using database:', process.env.DB_NAME);

    const collection = db.collection('products');
    //console.log('Querying collection: products');

    const product = await collection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      //console.log('Product not found for ID:', productId);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    //console.log('Product found:', product._id);
    return NextResponse.json({ product });
  } catch (error) {
    //console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}