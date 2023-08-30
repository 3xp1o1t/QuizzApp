import { QuizOptions as QuizOptionsType } from '@/types';

type QuizOptionsProps = {
  quizOptions: QuizOptionsType;
  selectedCategory: string;
  selectedDifficulty: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDifficultyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const QuizOptions: React.FC<QuizOptionsProps> = ({
  quizOptions,
  selectedCategory,
  selectedDifficulty,
  handleCategoryChange,
  handleDifficultyChange,
}) => {
  const renderSelectOptions = (optionName: string) => {
    const [optionKey, optionValues] = Object.entries(quizOptions).filter(
      ([key, value]) => key === optionName,
    )[0];

    const options = optionValues.map((options) => (
      <option key={options} value={options}>
        {options}
      </option>
    ));

    options.unshift(
      <option key="0" value="" disabled className="text-gray-500">
        {optionKey}
      </option>,
    );
    return options;
  };
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm text-dark">
          Categoría
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border w-[200px] py-2 px-2 rounded"
        >
          {renderSelectOptions('categories')}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="difficulty" className="text-sm text-dark">
          Dificultad
        </label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
          className="border w-[200px] py-2 px-2 rounded"
        >
          {renderSelectOptions('difficulties')}
        </select>
      </div>
    </div>
  );
};

export default QuizOptions;
