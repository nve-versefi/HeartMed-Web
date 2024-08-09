import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log('Received FormData entries:');

    const entries = Array.from(formData.entries());
    entries.forEach(([key, value]) => {
      console.log(key, typeof value);
    });

    const _id = formData.get('_id');
    console.log('Received _id:', _id);

    if (!_id || typeof _id !== 'string' || !ObjectId.isValid(_id)) {
      console.log('Invalid _id:', _id);
      return NextResponse.json({ error: 'Invalid _id' }, { status: 400 });
    }

    const title = formData.get('title') as string;
    const buttonText = formData.get('buttonText') as string;
    const order = parseInt(formData.get('order') as string);
    const imageFile = formData.get('image') as File | null;

    const updateFields: any = {
      title,
      buttonText,
      order,
    };

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString('base64');
      updateFields.imageUrl = `data:${imageFile.type};base64,${base64Image}`;
    }

    console.log('Update fields:', updateFields);

    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const carouselCollection = db.collection('carousel');

    const result = await carouselCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    console.log('Update result:', result);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Carousel item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Carousel item updated successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Failed to update carousel item:', error);
    return NextResponse.json({ error: 'Failed to update carousel item' }, { status: 500 });
  }
}