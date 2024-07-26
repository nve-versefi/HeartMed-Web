// app/api/getProducts/route.ts

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function GET(request: Request) {
  try {
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
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
