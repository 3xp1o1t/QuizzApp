import { Question } from '@/types';
import { hasDuplicates, showToast } from '@/util';
import { useState } from 'react';

type NewQuestionsProps = {
  questions: Question[];
  handleSetQuestions: (newQuestion: Question) => void;
};

type CheckboxStateType = {
  answer1Check: boolean;
  answer2Check: boolean;
  answer3Check: boolean;
};

type AnswersStateType = {
  answer1: string;
  answer2: string;
  answer3: string;
};

const initialAnswersState = {
  answer1: '',
  answer2: '',
  answer3: '',
};

const initialCheckboxState = {
  answer1Check: false,
  answer2Check: false,
  answer3Check: false,
};

const NewQuestions: React.FC<NewQuestionsProps> = ({
  questions,
  handleSetQuestions,
}) => {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<AnswersStateType>(initialAnswersState);
  const [checkboxState, setCheckboxState] =
    useState<CheckboxStateType>(initialCheckboxState);

  const handleAnswersCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name: checkboxName, checked: checkboxValue } = e.target;
    const updatedCheckboxState = {
      ...initialCheckboxState,
      [checkboxName]: checkboxValue,
    };
    setCheckboxState(updatedCheckboxState);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: answerName, value: answerValue } = e.target;
    const updatedAnswersState = {
      ...answers,
      [answerName]: answerValue,
    };

    setAnswers(updatedAnswersState);
  };

  const handleCheckQuestions = () => {
    if (questions.length === 10) {
      // max length
      showToast('warn', 'No se pueden agregar mas preguntas.');
      return;
    }

    if (!newQuestion) {
      showToast('warn', 'Se requiere agregar una pregunta!');
      return;
    }

    if (questions.find((q) => q.question === newQuestion)) {
      showToast('warn', 'Esta pregunta ya existe');
      return;
    }

    if (Object.values(answers).filter((answer) => !!answer).length < 3) {
      showToast('warn', 'Se require rellenar todas las respuestas');
      return;
    }

    if (hasDuplicates(Object.values(answers))) {
      showToast('warn', 'No puedes colocar las mismas respuestas!');
      return;
    }

    if (!Object.values(checkboxState).find((item) => item)) {
      showToast('warn', 'Debes marcar la respuesta correcta!');
      return;
    }

    // create question
    const checkedAnswer = Object.entries(checkboxState).find(
      ([key, value]) => value,
    );

    if (!checkedAnswer) return;

    const answerInputName = checkedAnswer[0].split('Check').shift();
    const foundAnswer = Object.entries(answers).find(
      ([key, value]) => key === answerInputName,
    );

    if (!foundAnswer) return;

    const newQuestionItem = {
      question: newQuestion,
      answers: Object.values(answers),
      correctAnswer: foundAnswer[1],
    };

    handleSetQuestions(newQuestionItem);
    showToast('success', 'Pregunta agregada!');

    // reset states
    setNewQuestion('');
    setAnswers(initialAnswersState);
    setCheckboxState(initialCheckboxState);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-primary font-bold">
        Crea 5 o 10 preguntas con 3 respuestas cada 1.
      </h3>

      <form>
        <div className="flex flex-col gap-4">
          {/*pregunta*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="newQuestion" className="text-sm text-gray-500">
              Nueva Pregunta
            </label>
            <input
              id="newQuestion"
              type="text"
              placeholder="Ingresa tu pregunta aqui"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="border text-lg py-1 px-3 rounded bg-light text-dark"
            />
          </div>

          {/*respuestas*/}
          <div className="flex flex-col md:flex-row gap-4">
            {/*answer1*/}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label htmlFor="answer1" className="text-sm text-gray-500">
                  Answer
                </label>
                <span className="text-sm text-gray-500">
                  Correcta{' '}
                  <input
                    name="answer1Check"
                    type="checkbox"
                    checked={checkboxState.answer1Check}
                    onChange={handleAnswersCheckboxChange}
                  />
                </span>
              </div>
              <input
                type="text"
                id="answer1"
                name="answer1"
                placeholder="respuesta 1"
                value={answers.answer1}
                onChange={handleAnswerChange}
                className="border text-lg py-1 px-3 rounded bg-light text-dark"
              />
            </div>
            {/*answer2*/}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label htmlFor="answer2" className="text-sm text-gray-500">
                  Answer
                </label>
                <span className="text-sm text-gray-500">
                  Correcta{' '}
                  <input
                    name="answer2Check"
                    type="checkbox"
                    checked={checkboxState.answer2Check}
                    onChange={handleAnswersCheckboxChange}
                  />
                </span>
              </div>
              <input
                type="text"
                id="answer2"
                name="answer2"
                placeholder="respuesta 2"
                value={answers.answer2}
                onChange={handleAnswerChange}
                className="border text-lg py-1 px-3 rounded bg-light text-dark"
              />
            </div>
            {/*answer3*/}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label htmlFor="answer1" className="text-sm text-gray-500">
                  Answer
                </label>
                <span className="text-sm text-gray-500">
                  Correcta{' '}
                  <input
                    name="answer3Check"
                    type="checkbox"
                    checked={checkboxState.answer3Check}
                    onChange={handleAnswersCheckboxChange}
                  />
                </span>
              </div>
              <input
                type="text"
                id="answer3"
                name="answer3"
                placeholder="respuesta 3"
                value={answers.answer3}
                onChange={handleAnswerChange}
                className="border text-lg py-1 px-3 rounded bg-light text-dark"
              />
            </div>
          </div>

          {/* agregar */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCheckQuestions}
              className="bg-primary hover:bg-blue-600 text-light py-2 px-4 rounded-md shadow transition"
            >
              Agregar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewQuestions;
