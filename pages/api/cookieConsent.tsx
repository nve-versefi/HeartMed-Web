import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import connect from '@/app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await connect();
      const db = client.db(process.env.DB_NAME);
      const cookieConsentCollection = db.collection('CookieConsent');

      const cookieConsent = await cookieConsentCollection.findOne({ userId: req.query.userId });

      if (!cookieConsent) {
        return res.status(404).json({ message: 'Cookie consent not found' });
      }

      res.status(200).json(cookieConsent);
    } catch (error) {
      console.error('Error retrieving cookie consent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, consentDetails, consentVersion } = req.body;

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

      res.status(200).json({ message: 'Cookie consent updated successfully' });
    } catch (error) {
      console.error('Error updating cookie consent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}