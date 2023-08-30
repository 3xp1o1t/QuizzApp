import { CreateQuizParams, SearchQuizParams, SolveQuizParams } from '@/types';
import { getErrorMessage } from '@/util';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://quizz-app-sandy.vercel.app/api';

export const getAllQuizzes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/quiz`);
    if (!response.ok) {
      console.log('Something went wrong');
      return [];
    }

    const data = await response.json();
    return data.quizList;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return [];
  }
};

export const getSingleQuiz = async (quizId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/quiz/${quizId}`);
    if (!response.ok) {
      console.log('Something went wrong');
      return {};
    }

    const data = await response.json();
    return data.quiz;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return {};
  }
};

export const solveQuiz = async (params: SolveQuizParams) => {
  try {
    const response = await fetch(`${BASE_URL}/quiz/solve-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      console.log('Something went wrong');
      return {};
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return {};
  }
};

export const getQuizOptions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/quiz/options`);
    if (!response.ok) {
      console.log('Something went wrong');
      return {};
    }

    const data = await response.json();
    return data.quizOptions;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return {};
  }
};

export const createQuiz = async (params: CreateQuizParams) => {
  try {
    const response = await fetch(`${BASE_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      console.log('something went wrong');
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return {};
  }
};

export const searchQuiz = async (params: SearchQuizParams) => {
  try {
    const searchParams = Object.entries(params)
      .filter(([key, value]) => !!value)
      .map((item) => `${item[0]}=${item[1]}`)
      .join('&');

    const response = await fetch(`${BASE_URL}/quiz/search?${searchParams}`);

    if (!response.ok) {
      console.log('something went wrong');
      return [];
    }

    const data = await response.json();
    return data.searchResult;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    return [];
  }
};
