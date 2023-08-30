import { QuizDetail, SolveQuizParams } from '@/types';
import { connnectToDatabase } from '@/util/db';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // single quiz
  if (req.method === 'POST') {
    try {
      const client = await connnectToDatabase();
      const db = client.db('quizzapp-db');
      const collection = db.collection('quizzes');

      const { quizId, username, userAnswers } = req.body as SolveQuizParams;

      // buscar la encuesta para sus respuestas.
      const quiz = (await collection.findOne({
        _id: new ObjectId(quizId),
      })) as QuizDetail;

      if (!quiz) {
        res.status(500).json({ message: 'No se encontro la encuesta' });
        return;
      }

      // verificar respuestas y respuestas correctas
      let score = 0;
      quiz.questions.forEach((q) => {
        const foundUserAnswer = userAnswers.find(
          (item) => item.question === q.question,
        );

        if (foundUserAnswer && foundUserAnswer.answer === q.correctAnswer) {
          score++;
        }
      });

      // actualizar participantes.
      const newParticipant = { username, score };
      // ordenamos de > a < deacuerdo a su score.
      const updatedParticipants = [...quiz.participants, newParticipant].sort(
        (a, b) => b.score - a.score,
      );

      await collection.updateOne(
        { _id: quiz._id },
        { $set: { participants: updatedParticipants } },
      );

      res.status(200).json({ result: updatedParticipants });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
