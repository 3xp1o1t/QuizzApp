import { connnectToDatabase } from '@/util/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // get
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

      const quizList = await collection
        .find({ isPublic: true }, { projection })
        .toArray();

      res.status(200).json({ quizList });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const client = await connnectToDatabase();
      const db = client.db('quizzapp-db');
      const collection = db.collection('quizzes');

      const { owner, genre, difficulty, questions, isPublic } = req.body;

      const now = new Date();
      const newQuiz = {
        owner,
        genre,
        difficulty,
        questions,
        isPublic,
        participants: [],
        createdAt: now,
        updateAt: now,
      };
      const { insertedId } = await collection.insertOne(newQuiz);

      res
        .status(201)
        .json({ message: 'Encuesta creada correctamente!', _id: insertedId });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
