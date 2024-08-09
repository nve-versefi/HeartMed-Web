import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const popUpModalsCollection = db.collection('popUpModals');
    const result = await popUpModalsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Pop-up modal deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Pop-up modal not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to delete pop-up modal:', error);
    return NextResponse.json({ error: 'Failed to delete pop-up modal' }, { status: 500 });
  }
}