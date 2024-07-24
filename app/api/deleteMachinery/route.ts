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
    const machineriesCollection = db.collection('Maquinaria');
    const result = await machineriesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Machinery deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Machinery not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to delete machinery:', error);
    return NextResponse.json({ error: 'Failed to delete machinery' }, { status: 500 });
  }
}