import { NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function GET() {
    try {
        const client = await connect();
        const db = client.db('Web');
        const menuItemsCollection = db.collection('menuItems');

        const regenerativaData = await menuItemsCollection.findOne(
            { title: "Medicina Regenerativa" },
            { projection: { _id: 0, submenu: 1, title: 1 } }
        );

        if (!regenerativaData) {
            return NextResponse.json({ error: 'Medicina Regenerativa data not found' }, { status: 404 });
        }

        return NextResponse.json(regenerativaData);
    } catch (error) {
        console.error('Failed to fetch Medicina Regenerativa data:', error);
        return NextResponse.json({ error: 'Failed to fetch Medicina Regenerativa data' }, { status: 500 });
    }
}