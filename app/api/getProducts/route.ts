import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryOperation(operation: () => Promise<any>, retries = MAX_RETRIES): Promise<any> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation. Attempts left: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
}

export async function GET(request: Request) {
  return retryOperation(async () => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const client = await connect();
    const db = client.db('Web');
    const productsCollection = db.collection('products');

    if (id) {
      const product = await productsCollection.findOne(
        { _id: new ObjectId(id) },
        {
          projection: {
            title: 1,
            description: 1,
            category: 1,
            thumbnailTitle: 1,
            thumbnail: 1,
            activeIngredient: 1,
            image1Title: 1,
            image2Title: 1,
            brand: 1,
            useCase: 1,
            price: 1,
            image1: 1,
            image2: 1
          }
        }
      );

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      product.price = parseFloat(product.price);

      return NextResponse.json({ product });
    } else {
      const products = await productsCollection.find({}, {
        projection: {
          title: 1,
          description: 1,
          category: 1,
          thumbnailTitle: 1,
          thumbnail: 1,
          activeIngredient: 1,
          brand: 1,
          image1Title: 1,
          image2Title: 1,
          useCase: 1,
          price: 1,
          image1: 1,
          image2: 1
        }
      }).toArray();

      products.forEach(product => {
        product.price = parseFloat(product.price);
      });

      return NextResponse.json({ products });
    }
  });
}