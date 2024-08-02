import { NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function GET() {
    try {
        const client = await connect();
        const db = client.db('Web');
        const menuItemsCollection = db.collection('menuItems');

        const result = await menuItemsCollection.aggregate([
            { $match: { title: "Medicina Regenerativa" } },
            { $unwind: "$submenu" },
            { $match: { "submenu.name": "Test Epigenético" } },
            { $project: { _id: 0, title: 1, submenu: "$submenu" } }
        ]).toArray();

        if (result.length === 0) {
            return NextResponse.json({ error: 'Medicina Estética with Test Epigenético data not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Failed to fetch Medicina Regenerativa data:', error);
        return NextResponse.json({ error: 'Failed to fetch Medicina Regenerativa data' }, { status: 500 });
    }
}
