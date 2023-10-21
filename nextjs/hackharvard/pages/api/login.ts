// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase_app from '../../config';

const auth = getAuth(firebase_app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // TODO: create a custom token or session
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
