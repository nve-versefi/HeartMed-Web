import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const popUpModalsCollection = db.collection('popUpModals');

    if (id) {
      const modal = await popUpModalsCollection.findOne({ _id: new ObjectId(id) });
      if (modal) {
        return NextResponse.json(modal);
      } else {
        return NextResponse.json({ error: 'Pop-up modal not found' }, { status: 404 });
      }
    } else {
      const modals = await popUpModalsCollection.find({}).toArray();
      return NextResponse.json(modals);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch pop-up modals' }, { status: 500 });
  }
}