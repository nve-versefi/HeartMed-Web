import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId, DeleteResult, UpdateResult } from 'mongodb';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { level, id, parentId, problemId } = req.query;

  console.log('Delete request received:', { level, id, parentId, problemId });

  if (!level || !id) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    let result: DeleteResult | UpdateResult;

    switch (level) {
      case 'menuItem':
        result = await collection.deleteOne({ id: parseInt(id as string, 10) });
        console.log('Deleted menuItem result:', result);
        break;

      case 'submenu':
        result = await collection.updateOne(
          { id: parseInt(parentId as string, 10) },
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
        return res.status(400).json({ message: 'Invalid level' });
    }

    if ('deletedCount' in result) {
      if (result.deletedCount === 0) {
        console.log('Item not found');
        return res.status(404).json({ message: 'Item not found' });
      }
    } else if ('modifiedCount' in result) {
      if (result.modifiedCount === 0) {
        console.log('Item not found');
        return res.status(404).json({ message: 'Item not found' });
      }
    }

    console.log('Item deleted successfully');
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
}