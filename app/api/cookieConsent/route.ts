import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import connect from '@/app/lib/mongodb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'Missing userId parameter' }, { status: 400 });
  }

  try {
    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const cookieConsentCollection = db.collection('CookieConsent');

    const cookieConsent = await cookieConsentCollection.findOne({ userId });

    if (!cookieConsent) {
      return NextResponse.json({ message: 'Cookie consent not found' }, { status: 404 });
    }

    return NextResponse.json(cookieConsent);
  } catch (error) {
    console.error('Error retrieving cookie consent:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, consentDetails, consentVersion } = await request.json();

    if (!userId || !consentDetails || !consentVersion) {
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
    }

    const client = await connect();
    const db = client.db(process.env.DB_NAME);
    const cookieConsentCollection = db.collection('CookieConsent');

    const consentTimestamp = new Date().toISOString();

    const result = await cookieConsentCollection.updateOne(
      { userId },
      {
        $set: {
          userId,
          consentTimestamp,
          consentVersion,
          consentDetails,
          consentWithdrawn: false,
          withdrawalTimestamp: null,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Cookie consent updated successfully' });
  } catch (error) {
    console.error('Error updating cookie consent:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}