import { QuizOptions } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const quizOptions: QuizOptions = {
  categories: [
    'Ciencia y Tecnologia',
    'Peliculas y Series',
    'Deportes',
    'Historia',
    'Geometria',
    'Matematicas',
    'Conocimiento General',
    'Comida',
    'Animales y Plantas',
  ],
  difficulties: ['Facil', 'Intermedio', 'Dificil'],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      res.status(200).json({ quizOptions });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
