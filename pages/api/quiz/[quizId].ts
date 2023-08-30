import { QuizDetail } from '@/types';
import { connnectToDatabase } from '@/util/db';
import { ObjectId } from 'mongodb';
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

      const quizId = req.query.quizId as string;

      if (!quizId) {
        res.status(500).json({ message: 'No se encontro la encuesta' });
        return;
      }

      const quiz = (await collection.findOne({
        _id: new ObjectId(quizId),
      })) as QuizDetail;

      if (!quiz) {
        res.status(500).json({ message: 'No se encontro la encuesta' });
        return;
      }

      // ocultar la respuesta correcta.
      const formattedQuiz = {
        ...quiz,
        questions: quiz.questions.map((q) => ({
          question: q.question,
          answers: q.answers,
        })),
      };

      res.status(200).json({ quiz: formattedQuiz });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
