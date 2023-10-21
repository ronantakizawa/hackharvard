// pages/api/private-endpoint.js
import * as admin from 'firebase-admin';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccountKeyPath = path.resolve(process.cwd(), 'firebase-credentials.json');
  const serviceAccountKey = JSON.parse(fs.readFileSync(serviceAccountKeyPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  //  databaseURL: 'https://your-project.firebaseio.com',
  });
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).send('ok')
    // ... rest of your code
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send('Unauthorized');
  }
};
