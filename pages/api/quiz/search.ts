import { connnectToDatabase } from '@/util/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const client = await connnectToDatabase();
      const db = client.db('quizzapp-db');
      const collection = db.collection('quizzes');

      const projection = {
        owner: 1,
        genre: 1,
        difficulty: 1,
        createdAt: 1,
        participants: 1,
      };

      const filter = {
        isPublic: true,
        ...req.query,
      };

      const searchResult = await collection
        .find({ ...filter }, { projection })
        .toArray();

      res.status(200).json({ searchResult });

      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
