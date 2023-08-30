import NewQuestions from '@/components/quiz/NewQuestions';
import QuizOptions from '@/components/quiz/QuizOptions';
import Spinner from '@/components/ui/Spinner';
import { createQuiz, getQuizOptions } from '@/services';
import { Question, QuizOptions as QuizOptionsType } from '@/types';
import { showToast } from '@/util';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import TrashIcon from '../public/assets/trash.svg';

type CreatePageProps = {
  quizOptions: QuizOptionsType;
};

const CreatePage: React.FC<CreatePageProps> = ({ quizOptions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [username, setUsername] = useState<string>('');
  const [privacy, setPrivacy] = useState<string>('Public');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = e.target.value;
    setSelectedDifficulty(difficulty);
  };

  const handleSetQuestions = (newQuestion: Question) => {
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleDeletedQuestions = (questionItem: Question) => {
    const updatedQuestions = questions.filter(
      (q) => q.question !== questionItem.question,
    );
    setQuestions(updatedQuestions);
    showToast('success', 'Pregunta eliminada!');
  };

  const handleCreateQuiz = async () => {
    if (questions.length < 5) {
      showToast('warn', 'Se requieren minimo 5 preguntas');
      return;
    }

    if (!selectedCategory || !selectedDifficulty) {
      showToast('warn', 'Debes seleccionar una categoria y una dificultad!');
      return;
    }

    if (!username) {
      showToast('warn', 'Debes de ingresar tu nombre');
      return;
    }

    // request
    const params = {
      owner: username,
      genre: selectedCategory,
      difficulty: selectedDifficulty,
      questions,
      isPublic: privacy === 'Public',
    };
    setLoading(true);
    const data = await createQuiz(params);
    setLoading(false);

    if (!data) {
      showToast('error', 'No se pudo crear la encuesta!');
    }

    const { message, _id } = data;
    showToast('success', `Quiz added - ID: ${_id}`);

    // clear states
    setSelectedCategory('');
    setSelectedDifficulty('');
    setQuestions([]);
    setUsername('');
    setPrivacy('');

    if (loading) {
      return <Spinner />;
    }
  };

  return (
    <Fragment>
      <Head>
        <title>QuizzApp: Crear una encuesta</title>
        <meta name="description" content="QuizzApp crea una encuesta" />
      </Head>

      <div className="flex flex-col gap-4">
        <QuizOptions
          quizOptions={quizOptions}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          handleCategoryChange={handleCategoryChange}
          handleDifficultyChange={handleDifficultyChange}
        />

        <NewQuestions
          questions={questions}
          handleSetQuestions={handleSetQuestions}
        />

        {/* questions list */}
        {questions.length > 0 && (
          <div className="animate-slideUp flex flex-col gap-3">
            <div>
              <h3 className="text-primary pl-2 font-bold border-l-4 border-l-primary">
                Lista de preguntas
              </h3>
              <p className="text-sm text-gray-400">
                Revisalo bien antes de enviarlo!
              </p>
            </div>

            <ul className="flex flex-col gap-2">
              {questions.map((question, index) => (
                <li
                  key={question.question}
                  className="border rounded-md p-2 flex justify-between items-start gap-2"
                >
                  <div>
                    <p className="mb-2">
                      <span className="text-primary font-bold">
                        {index + 1}
                      </span>
                      . {question.question}
                    </p>

                    <ul className="flex items-center gap-3">
                      {question.answers.map((answer) => (
                        <li
                          key={answer}
                          className={`text-sm py-1 px-2 rounded shadow ${
                            answer === question.correctAnswer
                              ? 'bg-primary'
                              : 'bg-light'
                          }`}
                        >
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleDeletedQuestions(question)}
                      className="py-1 px-2 rounded bg-danger hover:bg-rose-800 text-light flex items-center gap-2 transition"
                    >
                      <Image src={TrashIcon} alt="Pen icon" width={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Name privacity create*/}
        {questions.length >= 5 && (
          <div className="h-10 flex gap-2">
            <input
              type="text"
              placeholder="Tu nombre?"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-2 px-4 rounded-md shadow"
            />

            <select
              id="privacy"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="py-2 px-4 rounded-md shadow"
            >
              <option value="Public">Publica</option>
              <option value="Private">Privada</option>
            </select>

            <button
              onClick={handleCreateQuiz}
              className="text-xl font-bold bg-primary text-light hover:bg-blue-600 px-4 rounded-md shadow"
            >
              Create
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

//server side props
export const getServerSideProps = async () => {
  const quizOptions = await getQuizOptions();
  return {
    props: {
      quizOptions,
    },
  };
};

export default CreatePage;
