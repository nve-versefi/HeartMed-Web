import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        const client = await connect();
        const db = client.db('Web');
        const machineriesCollection = db.collection('Maquinaria');

        const projection = {
            title: 1,
            description: 1,
            category: 1,
            brand: 1,
            status: 1,
            price: 1,
            rentalPrice: 1,
            image1Title: 1,
            image2Title: 1,
            image1: 1,
            image2: 1,
        };

        if (id) {
            const machinery = await machineriesCollection.findOne(
                { _id: new ObjectId(id) },
                { projection }
            );

            if (!machinery) {
                return NextResponse.json({ error: 'Machinery not found' }, { status: 404 });
            }

            machinery.price = parseFloat(machinery.price);
            machinery.rentalPrice = parseFloat(machinery.rentalPrice);

            console.log('Machinery fetched:', machinery);

            return NextResponse.json({ machinery });
        } else {
            const machineries = await machineriesCollection.find({}, { projection }).toArray();

            machineries.forEach(machinery => {
                machinery.price = parseFloat(machinery.price);
                machinery.rentalPrice = parseFloat(machinery.rentalPrice);
            });

            console.log('Machineries fetched:', machineries);
            return NextResponse.json({ machineries });
        }
    } catch (error) {
        console.error('Failed to fetch machineries:', error);
        return NextResponse.json({ error: 'Failed to fetch machineries' }, { status: 500 });
    }
}