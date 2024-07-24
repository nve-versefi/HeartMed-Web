import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');
  const id = searchParams.get('id');
  const parentId = searchParams.get('parentId');
  const problemId = searchParams.get('problemId');

  const itemData = await request.json();

  console.log('Received request:', { level, id, parentId, problemId, itemData });

  if (!level || !id) {
    return NextResponse.json({ message: 'Missing or invalid required parameters: level and id' }, { status: 400 });
  }

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    let result;

    switch (level) {
      case 'menuItem':
        result = await collection.updateOne(
          { id: parseInt(id) },
          {
            $set: {
              title: itemData.title,
              path: itemData.path,
              image: itemData.image,
              newTab: itemData.newTab === 'true'
            }
          }
        );
        break;

      case 'submenu':
        if (!parentId) {
          return NextResponse.json({ message: 'Missing required parameter: parentId for submenu' }, { status: 400 });
        }
        result = await collection.updateOne(
          { id: parseInt(parentId), 'submenu.name': id },
          {
            $set: {
              'submenu.$.name': itemData.title,
              'submenu.$.path': itemData.path,
              'submenu.$.imageUrl': itemData.image
            }
          }
        );
        break;

      case 'problem':
        if (!parentId) {
          return NextResponse.json({ message: 'Missing required parameter: parentId for problem' }, { status: 400 });
        }
        result = await collection.updateOne(
          { 'submenu.name': parentId, 'submenu.problems.name': id },
          {
            $set: {
              'submenu.$[submenu].problems.$[problem].name': itemData.title,
              'submenu.$[submenu].problems.$[problem].imageUrl': itemData.image
            }
          },
          {
            arrayFilters: [
              { 'submenu.name': parentId },
              { 'problem.name': id }
            ]
          }
        );
        break;

      case 'service':
        if (!parentId || !problemId) {
          return NextResponse.json({ message: 'Missing required parameters: parentId and problemId for service' }, { status: 400 });
        }
        result = await collection.updateOne(
          { 'submenu.name': parentId, 'submenu.problems.name': problemId, 'submenu.problems.services.serviceName': id },
          {
            $set: {
              'submenu.$[submenu].problems.$[problem].services.$[service].serviceName': itemData.title,
              'submenu.$[submenu].problems.$[problem].services.$[service].servicePath': itemData.path
            }
          },
          {
            arrayFilters: [
              { 'submenu.name': parentId },
              { 'problem.name': problemId },
              { 'service.serviceName': id }
            ]
          }
        );
        break;

      default:
        return NextResponse.json({ message: `Invalid level: ${level}` }, { status: 400 });
    }

    console.log('Operation result:', result);

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Item not found. No update performed.' }, { status: 404 });
    }
    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Item found, but no changes were needed.' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Item updated successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ message: `Error updating item: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}