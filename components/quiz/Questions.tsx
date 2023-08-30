import { Question } from '@/types';
import QuestionItem from './QuestionItem';

type QuestionsProps = {
  questions: Question[];
  solvedSuccessfully: boolean;
  onAnswer: (question: string, answer: string) => void;
};

const Questions: React.FC<QuestionsProps> = ({
  questions,
  solvedSuccessfully,
  onAnswer,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, index) => (
        <QuestionItem
          key={index}
          question={q}
          index={index}
          solvedSuccessfully={solvedSuccessfully}
          onAnswer={onAnswer}
        />
      ))}
    </div>
  );
};

export default Questions;
