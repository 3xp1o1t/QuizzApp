import { Question } from '@/types';
import { useEffect, useState } from 'react';

type QuestionItemProps = {
  question: Question;
  index: number;
  solvedSuccessfully: boolean;
  onAnswer: (question: string, answer: string) => void;
};

const Questions: React.FC<QuestionItemProps> = ({
  question,
  index,
  solvedSuccessfully,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    if (solvedSuccessfully) {
      setSelectedAnswer('');
    }
  }, [solvedSuccessfully]);

  const handleAnswerClick = (a: string) => {
    setSelectedAnswer(a);
    onAnswer(question.question, a);
  };

  const btnClass = 'flex-1 h-12 text-sm hover:bg-gray-200 transition';

  return (
    <div className="p-3 bg-light rounded-lg shadow-md animate-slideRight">
      <p className="text-2xl mb-4 text-dark">
        <span className="text-gray-400">{index + 1}</span>. {question.question}
      </p>

      {/* Botones de respuesta */}
      <div className="flex justify-between items-center gap-0 5 rounded-md overflow-hidden shadow-sm">
        {question.answers.map((a, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(a)}
            className={
              selectedAnswer === a
                ? `${btnClass} bg-gradient-to-b from-teal-300 to-teal-400 text-light`
                : `${btnClass} bg-white`
            }
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
