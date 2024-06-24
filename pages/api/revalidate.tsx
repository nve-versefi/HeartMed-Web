import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATION_SECRET) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    try {
      // Revalidate the home page and any other pages that use the navbar
      await res.revalidate('/');
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).send('Error revalidating');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}