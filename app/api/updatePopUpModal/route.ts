import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connect from '@/app/lib/mongodb';

export async function PUT(req: NextRequest) {
  try {
    const json = await req.json(); 

    const _id = json._id as string;
    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({ error: 'Invalid _id' }, { status: 400 });
    }

    const updateFields: any = {};

    if (json.title !== undefined) updateFields.title = json.title;
    if (json.mainText !== undefined) updateFields.mainText = json.mainText;
    if (json.imageUrl !== undefined) updateFields.imageUrl = json.imageUrl;
    if (json.triggerType !== undefined) updateFields.triggerType = json.triggerType;
    if (json.triggerValue !== undefined) updateFields.triggerValue = parseFloat(json.triggerValue);
    if (json.isActive !== undefined) updateFields.isActive = json.isActive === true;
    if (json.template !== undefined) updateFields.template = json.template;
    if (json.ctaButtonText !== undefined) updateFields.ctaButtonText = json.ctaButtonText;
    if (json.ctaButtonLink !== undefined) updateFields.ctaButtonLink = json.ctaButtonLink;
    if (json.inputLabel1 !== undefined) updateFields.inputLabel1 = json.inputLabel1;
    if (json.inputLabel2 !== undefined) updateFields.inputLabel2 = json.inputLabel2;
    if (json.smallText !== undefined) updateFields.smallText = json.smallText;

    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const popUpModalsCollection = db.collection('popUpModals');

    const result = await popUpModalsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Pop-up modal not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Pop-up modal updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update pop-up modal:', error);
    return NextResponse.json({ error: 'Failed to update pop-up modal' }, { status: 500 });
  }
}
