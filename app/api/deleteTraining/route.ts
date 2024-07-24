import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const client = await connect();
    const db = client.db('Web');
    const trainingsCollection = db.collection('Formaciones');
    const result = await trainingsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Training deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to delete training:', error);
    return NextResponse.json({ error: 'Failed to delete training' }, { status: 500 });
  }
}