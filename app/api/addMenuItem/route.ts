import { NextRequest, NextResponse } from 'next/server';
import { ObjectId, Document } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');
  const parentId = searchParams.get('parentId');
  const problemId = searchParams.get('problemId');

  const itemData = await request.json();

  console.log('Received request:', { level, parentId, problemId, itemData });

  if (!level) {
    return NextResponse.json({ message: 'Missing or invalid required parameter: level' }, { status: 400 });
  }

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    let result;

    switch (level) {
      case 'menuItem':
        result = await collection.insertOne({
          title: itemData.title,
          path: itemData.path,
          image: itemData.image,
          newTab: itemData.newTab === 'true',
          submenu: []
        });
        break;

      case 'submenu':
        if (!parentId) {
          return NextResponse.json({ message: 'Missing required parameter: parentId for submenu' }, { status: 400 });
        }
        
        let query: Document;
        if (ObjectId.isValid(parentId)) {
          query = { _id: new ObjectId(parentId) };
        } else {
          const parentIdInt = parseInt(parentId, 10);
          if (isNaN(parentIdInt)) {
            return NextResponse.json({ message: 'Invalid parentId: must be a valid ObjectId or an integer' }, { status: 400 });
          }
          query = { id: parentIdInt };
        }

        result = await collection.updateOne(
          query,
          {
            $push: {
              submenu: {
                name: itemData.title,
                path: itemData.path,
                imagePath: itemData.image,
                imageUrl: itemData.image,
                problems: []
              }
            } as any
          }
        );
        break;

      case 'problem':
        if (!parentId) {
          return NextResponse.json({ message: 'Missing required parameter: parentId for problem' }, { status: 400 });
        }
        result = await collection.updateOne(
          { "submenu.name": parentId },
          {
            $push: {
              "submenu.$.problems": {
                name: itemData.title,
                imageUrl: itemData.image,
                services: []
              }
            } as any
          }
        );
        break;

      case 'service':
        if (!parentId || !problemId) {
          return NextResponse.json({ message: 'Missing required parameters: parentId and problemId for service' }, { status: 400 });
        }
        console.log('Attempting to add service:', { parentId, problemId, itemData });
        
        result = await collection.updateOne(
          { "submenu.name": parentId, "submenu.problems.name": problemId },
          {
            $push: {
              "submenu.$[submenu].problems.$[problem].services": {
                serviceName: itemData.title,
                servicePath: itemData.path
              }
            } as any
          },
          {
            arrayFilters: [
              { "submenu.name": parentId },
              { "problem.name": problemId }
            ]
          }
        );
        console.log('Service addition result:', result);
        break;

      default:
        return NextResponse.json({ message: `Invalid level: ${level}` }, { status: 400 });
    }

    console.log('Operation result:', result);

    if ('matchedCount' in result && result.matchedCount === 0) {
      return NextResponse.json({ message: 'Failed to add item: No matching document found' }, { status: 404 });
    }
    if ('modifiedCount' in result && result.modifiedCount === 0 && level !== 'menuItem') {
      return NextResponse.json({ message: 'Failed to add item: No document modified' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item added successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error adding item:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: `Error adding item: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}