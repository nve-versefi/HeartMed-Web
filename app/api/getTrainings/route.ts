import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const client = await connect();
        const db = client.db('Web');
        const trainingsCollection = db.collection('Formaciones');

        const projection = {
            title: 1,
            description: 1,
            category: 1,
            trainer: 1,
            duration: 1,
            price: 1,
            date: 1,
            image1Title: 1,
            image2Title: 1,
            image1: 1,
            image2: 1,
        };

        if (id) {
            const training = await trainingsCollection.findOne(
                { _id: new ObjectId(id) },
                { projection }
            );

            if (!training) {
                return NextResponse.json({ error: 'Training not found' }, { status: 404 });
            }

            training.price = parseFloat(training.price);
            console.log('Training fetched:', training);

            return NextResponse.json({ training });
        } else {
            const trainings = await trainingsCollection.find({}, { projection }).toArray();

            trainings.forEach(training => {
                training.price = parseFloat(training.price);
            });

            console.log('Trainings fetched:', trainings);
            return NextResponse.json({ trainings });
        }
    } catch (error) {
        console.error('Failed to fetch trainings:', error);
        return NextResponse.json({ error: 'Failed to fetch trainings' }, { status: 500 });
    }
}