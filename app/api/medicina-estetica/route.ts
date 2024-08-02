import { NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function GET() {
    let client;
    try {
        //console.log('Attempting to connect to MongoDB...');
        client = await connect();
        //console.log('Connected to MongoDB successfully');

        const db = client.db(process.env.DB_NAME);
        //console.log('Using database:', process.env.DB_NAME);

        const menuItemsCollection = db.collection('menuItems');
        //console.log('Accessing menuItems collection');

        const medicinaEsteticaData = await menuItemsCollection.findOne(
            { title: "Medicina Estética" },
            { projection: { _id: 0, submenu: 1 } }
        );
        //console.log('Query result:', JSON.stringify(medicinaEsteticaData, null, 2));

        if (!medicinaEsteticaData) {
            //console.log('Medicina Estética data not found');
            return NextResponse.json({ error: 'Medicina Estética data not found' }, { status: 404 });
        }

        //console.log('Returning Medicina Estética data');
        return NextResponse.json(medicinaEsteticaData.submenu);
    } catch (error) {
        console.error('Failed to fetch Medicina Estética data:', error);
        console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Failed to fetch Medicina Estética data', details: errorMessage }, { status: 500 });
    } finally {
        if (client) {
            //console.log('Closing MongoDB connection');
            await client.close();
        }
    }
}