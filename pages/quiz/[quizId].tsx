import Questions from '@/components/quiz/Questions';
import ResultModal from '@/components/quiz/ResultModal';
import Spinner from '@/components/ui/Spinner';
import { getSingleQuiz, solveQuiz } from '@/services';
import { Participant, QuizDetail, SolveQuizParams, UserAnswer } from '@/types';
import { formatDate, generateUniqueUserTag, showToast } from '@/util';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import HashIcon from '../../public/assets/hash.svg';
import ZapIcon from '../../public/assets/zap.svg';

type QuizPageProps = {
  quizDetail: QuizDetail;
};

const QuizPage: React.FC<QuizPageProps> = ({ quizDetail }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [username, setUsername] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>(
    quizDetail.participants,
  );
  const [resultModalVisible, setResultModalVisible] = useState<boolean>(false);
  const [solvedSuccessfully, setSolvedSuccessfully] = useState<boolean>(false);

  const onAnswer = (question: string, answer: string) => {
    const newUserAnswer = { question, answer };
    const currentAnswers = [...userAnswers];

    const found = currentAnswers.find((item) => item.question === question);

    if (found) {
      // update
      const updatedAnswers = currentAnswers.map((item) => {
        if (item.question === found.question) {
          return {
            question: item.question,
            answer,
          };
        }
        return item;
      });
      setUserAnswers(updatedAnswers);
    } else {
      //push
      setUserAnswers((prev) => [...prev, newUserAnswer]);
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onModalClose = () => {
    setUsername('');
    setUserAnswers([]);
    setSolvedSuccessfully(false);
    setResultModalVisible(false);
  };

  const handleSolveQuiz = async () => {
    if (!username) {
      showToast('warn', 'Se require un nombre de usuario');
      return;
    }

    if (!quizDetail) {
      return;
    }

    const params: SolveQuizParams = {
      quizId: quizDetail._id.toString()!,
      username: `${username}${generateUniqueUserTag()}`,
      userAnswers,
    };

    setLoading(true);
    const result = await solveQuiz(params);
    setLoading(false);

    if (result) {
      // update participants list
      setParticipants(result);
      setResultModalVisible(true);
      setSolvedSuccessfully(true);
    }
  };

  if (!quizDetail) {
    return <p className="text-gray-500">No hay nada que mostrar...</p>;
  }

  return (
    <Fragment>
      <Head>
        <title>QuizzApp: Resolver encuesta</title>
        <meta name="description" content="QuizzApp: Resolver encuesta" />
      </Head>

      {resultModalVisible && (
        <ResultModal
          title="Puntuacion participantes"
          result={participants}
          onModalClose={onModalClose}
        />
      )}

      {loading && <Spinner />}

      <div className="flex flex-col gap-10">
        {/* info cabecera */}
        <div className="p-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex flex-col items-start gap-2 md:flex-row md:justify-between p-2 bg-white rounded-md">
            <div>
              <h3 className="text-xl mb-2">
                Creada por{' '}
                <span className="text-primary">{quizDetail.owner}</span>{' '}
                {formatDate(quizDetail.createdAt)}
              </h3>
              <p className="text-sm text-gray-500">
                {quizDetail._id.toString()}
              </p>
            </div>

            <div className="flex flex-row md:flex-col items end justify-between gap-2">
              <span className="flex gap-2">
                <Image src={HashIcon} alt="Hash icon" /> {quizDetail.genre}
              </span>
              <span className="flex gap-2">
                <Image src={ZapIcon} alt="Zap icon" /> {quizDetail.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* preguntas */}
        <Questions
          questions={quizDetail.questions}
          solvedSuccessfully={solvedSuccessfully}
          onAnswer={onAnswer}
        />

        <div className="flex justify-end gap-2">
          <input
            type="text"
            placeholder="Cual es tu nombre?"
            value={username}
            onChange={handleUserNameChange}
            className="py-2 px-4 rounded-md shadow"
          />

          <button
            disabled={userAnswers.length !== quizDetail.questions.length}
            onClick={handleSolveQuiz}
            className="bg-primary hover:bg-blue-600 text-light py-2 px-4 rounded-md shadow transition"
          >
            Enviar
          </button>
        </div>

        {/* participantes */}
        {participants.length > 0 && (
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
            <div>
              <h3 className="text-primary pl-2 font-bold border-l-4 border-l-primary">
                Total de participantes
              </h3>
              <p className="text-sm text-gray-400">Lo podrias hacer mejor?</p>
            </div>

            <ul className="flex flex-col gap-2">
              {participants.map((item) => (
                <li
                  key={item.username}
                  className="h-8 bg-light rounded text-gray-600 shadow flex justify-between items-center"
                >
                  <span className="pl-3">{item.username}</span>
                  <span className="w-8 h-full rounded-r flex justify-center items-center font-bold text-light bg-primary">
                    {item.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { quizId } = context.query;
  const quizDetail = await getSingleQuiz(quizId as string);

  return {
    props: {
      quizDetail,
    },
  };
}

export default QuizPage;
