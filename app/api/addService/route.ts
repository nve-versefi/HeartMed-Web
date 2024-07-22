import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import connect from '@/app/lib/mongodb';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

// Configure Formidable to handle file uploads
const form = formidable({ multiples: true, keepExtensions: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

const convertFileToBase64 = async (filePath: string): Promise<string> => {
  const fileBuffer = await fs.readFile(filePath);
  return `data:${filePath.split('.').pop()};base64,${fileBuffer.toString('base64')}`;
};

const parseForm = async (req: IncomingMessage) => {
  return new Promise<{ fields: any, files: any }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    // Convert NextRequest to IncomingMessage
    const buffers: Buffer[] = [];
    const reader = req.body?.getReader();
    if (reader) {
      let done = false;
      while (!done) {
        const { done: doneReading, value } = await reader.read();
        if (doneReading) {
          done = true;
        } else {
          buffers.push(Buffer.from(value));
        }
      }
    }
    const body = Buffer.concat(buffers);
    const stream = new Readable();
    stream.push(body);
    stream.push(null);

    // Typecast stream to IncomingMessage
    const incomingMessage = stream as unknown as IncomingMessage;

    // Manually add headers to the incoming message
    incomingMessage.headers = {
      'content-type': req.headers.get('content-type') || '',
      'content-length': req.headers.get('content-length') || body.length.toString(),
    };

    const { fields, files } = await parseForm(incomingMessage);

    const {
      title,
      category,
      subcategory,
      subtitle1,
      what,
      subtitle2,
      how,
      subtitle3,
      area,
      time,
      anesthesia,
      finance,
      results,
      hospital,
      objective1,
      objective2,
      extra,
      faq1,
      answer1,
      faq2,
      answer2,
      faq3,
      answer3,
      faq4,
      answer4,
      faq5,
      answer5,
      faq6,
      answer6,
      faq7,
      answer7,
      faq8,
      answer8,
      faq9,
      answer9,
      targetAreas,
      objectives,
      relatedProd
    } = fields;

    const service: any = {
      title,
      category,
      subcategory,
      image1_title: fields.image1_title,
      image2_title: fields.image2_title,
      image3_title: fields.image3_title,
      subtitle1,
      what,
      subtitle2,
      how,
      subtitle3,
      area,
      time,
      anesthesia,
      finance,
      results,
      hospital,
      objective1,
      objective2,
      extra,
      faq1,
      answer1,
      faq2,
      answer2,
      faq3,
      answer3,
      faq4,
      answer4,
      faq5,
      answer5,
      faq6,
      answer6,
      faq7,
      answer7,
      faq8,
      answer8,
      faq9,
      answer9,
      targetAreas: JSON.parse(targetAreas),
      objectives: JSON.parse(objectives),
      relatedProd: JSON.parse(relatedProd)
    };

    const image1File = files.image1 ? files.image1[0] : null;
    const image2File = files.image2 ? files.image2[0] : null;
    const image3File = files.image3 ? files.image3[0] : null;

    if (image1File) {
      service.image1 = await convertFileToBase64(image1File.filepath);
      service.image1_title = image1File.originalFilename;
    }
    if (image2File) {
      service.image2 = await convertFileToBase64(image2File.filepath);
      service.image2_title = image2File.originalFilename;
    }
    if (image3File) {
      service.image3 = await convertFileToBase64(image3File.filepath);
      service.image3_title = image3File.originalFilename;
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
