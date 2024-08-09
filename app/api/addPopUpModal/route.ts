import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const mainText = formData.get('mainText') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const triggerType = formData.get('triggerType') as 'time' | 'scroll' | 'exit';
    const triggerValue = parseFloat(formData.get('triggerValue') as string);
    const isActive = formData.get('isActive') === 'true';
    const template = formData.get('template') as 'template1' | 'template2';
    const ctaButtonText = formData.get('ctaButtonText') as string;
    const ctaButtonLink = formData.get('ctaButtonLink') as string;
    const inputLabel1 = formData.get('inputLabel1') as string | undefined;
    const inputLabel2 = formData.get('inputLabel2') as string | undefined;
    const smallText = formData.get('smallText') as string | undefined;

    const newPopUpModal: any = {
      title,
      mainText,
      imageUrl: imageUrl || '', // Ensure imageUrl is saved as a string
      triggerType,
      triggerValue,
      isActive,
      template,
      ctaButtonText,
      ctaButtonLink,
    };

    if (template === 'template1') {
      newPopUpModal.inputLabel1 = inputLabel1;
      newPopUpModal.inputLabel2 = inputLabel2;
    } else if (template === 'template2') {
      newPopUpModal.smallText = smallText;
    }

    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const popUpModalsCollection = db.collection('popUpModals');
    const result = await popUpModalsCollection.insertOne(newPopUpModal);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to add pop-up modal:', error);
    return NextResponse.json({ error: 'Failed to add pop-up modal' }, { status: 500 });
  }
}
