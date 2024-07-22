import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const client = await connect();
        const db = client.db('Web');
        const servicesCollection = db.collection('Tratamientos');

        if (id) {
            const service = await servicesCollection.findOne(
                { _id: new ObjectId(id) },
                {
                    projection: {
                        title: 1,
                        category: 1,
                        subcategory: 1,
                        image1_title: 1,
                        image2_title: 1,
                        image3_title: 1,
                        subtitle1: 1,
                        what: 1,
                        anesthesia: 1,
                        time: 1,
                        finance: 1,
                        results: 1,
                        hospital: 1,
                        subtitle2: 1,
                        how: 1,
                        subtitle3: 1,
                        area: 1,
                        objective1: 1,
                        objective2: 1,
                        extra: 1,
                        faq1: 1,
                        answer1: 1,
                        faq2: 1,
                        answer2: 1,
                        faq3: 1,
                        answer3: 1,
                        faq4: 1,
                        answer4: 1,
                        faq5: 1,
                        answer5: 1,
                        faq6: 1,
                        answer6: 1,
                        faq7: 1,
                        answer7: 1,
                        faq8: 1,
                        answer8: 1,
                        faq9: 1,
                        answer9: 1,
                        targetAreas: 1,
                        objectives: 1,
                        relatedProd: 1,
                        image1: 1,
                        image2: 1,
                        image3: 1,
                    }
                }
            );

            if (!service) {
                return NextResponse.json({ error: 'Service not found' }, { status: 404 });
            }

            console.log('Service fetched:', service);
            return NextResponse.json({ service });
        } else {
            const services = await servicesCollection.find({}, {
                projection: {
                    title: 1,
                    category: 1,
                    subcategory: 1,
                    subtitle1: 1,
                    what: 1,
                    subtitle2: 1,
                    how: 1,
                    subtitle3: 1,
                    area: 1,
                    finance: 1,
                    time: 1,
                    anesthesia: 1,
                    results: 1,
                    hospital: 1,
                    image1_title: 1,
                    image2_title: 1,
                    image3_title: 1,
                    objectives: 1,
                    targetAreas: 1
                }
            }).toArray();
            return NextResponse.json({ services });
        }
    } catch (error) {
        console.error('Failed to fetch service:', error);
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}
