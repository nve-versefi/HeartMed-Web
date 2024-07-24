import { NextRequest, NextResponse } from 'next/server';
import { ObjectId, DeleteResult, UpdateResult } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');
  const id = searchParams.get('id');
  const parentId = searchParams.get('parentId');
  const problemId = searchParams.get('problemId');

  console.log('Delete request received:', { level, id, parentId, problemId });

  if (!level || !id) {
    return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    let result: DeleteResult | UpdateResult;

    switch (level) {
      case 'menuItem':
        result = await collection.deleteOne({ id: parseInt(id, 10) });
        console.log('Deleted menuItem result:', result);
        break;

      case 'submenu':
        result = await collection.updateOne(
          { id: parseInt(parentId!, 10) },
          { $pull: { submenu: { name: id } } as any }
        );
        console.log('Deleted submenu result:', result);
        break;

      case 'problem':
        result = await collection.updateOne(
          { 'submenu.name': parentId },
          { $pull: { 'submenu.$.problems': { name: id } } as any }
        );
        console.log('Deleted problem result:', result);
        break;

      case 'service':
        result = await collection.updateOne(
          { 'submenu.name': parentId, 'submenu.problems.name': problemId },
          { $pull: { 'submenu.$[submenu].problems.$[problem].services': { serviceName: id } } as any },
          { 
            arrayFilters: [
              { 'submenu.name': parentId },
              { 'problem.name': problemId }
            ] 
          }
        );
        console.log('Deleted service result:', result);
        break;

      default:
        return NextResponse.json({ message: 'Invalid level' }, { status: 400 });
    }

    if ('deletedCount' in result) {
      if (result.deletedCount === 0) {
        console.log('Item not found');
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
      }
    } else if ('modifiedCount' in result) {
      if (result.modifiedCount === 0) {
        console.log('Item not found');
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
      }
    }

    console.log('Item deleted successfully');
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ message: 'Error deleting item' }, { status: 500 });
  }
}