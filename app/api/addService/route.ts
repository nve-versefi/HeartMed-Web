import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';

const convertFileToBase64 = async (file: File | null): Promise<string> => {
  if (!file) return '';
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const service: any = {
      title: formData.get('title'),
      category: formData.get('category'),
      subcategory: formData.get('subcategory'),
      subtitle1: formData.get('subtitle1'),
      what: formData.get('what'),
      subtitle2: formData.get('subtitle2'),
      how: formData.get('how'),
      subtitle3: formData.get('subtitle3'),
      area: formData.get('area'),
      time: formData.get('time'),
      anesthesia: formData.get('anesthesia'),
      finance: formData.get('finance'),
      results: formData.get('results'),
      hospital: formData.get('hospital'),
      objective1: formData.get('objective1'),
      objective2: formData.get('objective2'),
      extra: formData.get('extra'),
      faq1: formData.get('faq1'),
      answer1: formData.get('answer1'),
      faq2: formData.get('faq2'),
      answer2: formData.get('answer2'),
      faq3: formData.get('faq3'),
      answer3: formData.get('answer3'),
      faq4: formData.get('faq4'),
      answer4: formData.get('answer4'),
      faq5: formData.get('faq5'),
      answer5: formData.get('answer5'),
      faq6: formData.get('faq6'),
      answer6: formData.get('answer6'),
      faq7: formData.get('faq7'),
      answer7: formData.get('answer7'),
      faq8: formData.get('faq8'),
      answer8: formData.get('answer8'),
      faq9: formData.get('faq9'),
      answer9: formData.get('answer9'),
      targetAreas: JSON.parse(formData.get('targetAreas') as string),
      objectives: JSON.parse(formData.get('objectives') as string),
      relatedProd: JSON.parse(formData.get('relatedProd') as string)
    };

    const image1File = formData.get('image1') as File | null;
    const image2File = formData.get('image2') as File | null;
    const image3File = formData.get('image3') as File | null;

    if (image1File) {
      service.image1 = await convertFileToBase64(image1File);
      service.image1_title = image1File.name;
    }
    if (image2File) {
      service.image2 = await convertFileToBase64(image2File);
      service.image2_title = image2File.name;
    }
    if (image3File) {
      service.image3 = await convertFileToBase64(image3File);
      service.image3_title = image3File.name;
    }

    const client: MongoClient = await connect();
    const db = client.db('Web');
    const servicesCollection = db.collection('Tratamientos');
    const result = await servicesCollection.insertOne(service);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to add service:', error);
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
  }
}