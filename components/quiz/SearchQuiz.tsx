import { QuizOptions as QuizOptionsType, SearchQuizParams } from '@/types';
import { showToast } from '@/util';
import { useState } from 'react';
import QuizOptions from './QuizOptions';

type SearchQuizProps = {
  quizOptions: QuizOptionsType;
  handleSearchQuiz: (params: SearchQuizParams) => Promise<void>;
  handleResetSearch: () => void;
};

const SearchQuiz: React.FC<SearchQuizProps> = ({
  quizOptions,
  handleSearchQuiz,
  handleResetSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = e.target.value;
    setSelectedDifficulty(difficulty);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setUsername('');
    handleResetSearch();
  };

  const handleSearchClick = () => {
    if (!(selectedCategory || selectedDifficulty || username)) {
      showToast(
        'warn',
        'Selecciona una categoria, dificultad o nombre de usuario para buscar.',
      );
      return;
    }
    const params: SearchQuizParams = {
      genre: selectedCategory,
      difficulty: selectedDifficulty,
      owner: username,
    };
    handleSearchQuiz(params);
  };

  return (
    <div className="mb-6">
      <form className="flex flex-col md:flex-row gap-3">
        <QuizOptions
          quizOptions={quizOptions}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          handleCategoryChange={handleCategoryChange}
          handleDifficultyChange={handleDifficultyChange}
        />

        <div className="flex flex-col gap-1 w-[200px]">
          <label htmlFor="username" className="text-sm">
            Usuario
          </label>

          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Buscar por usuario"
            className="flex-1 py-1 px-3 rounded border"
          />
        </div>

        <div className="w-full md:place-self-end flex flex-col gap-1 items-start md:items-end">
          <button
            type="button"
            onClick={handleReset}
            className="text-gray-400 hover:text-gray-500 text-sm font-bold"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSearchClick}
            className="py-1 px-2 rounded bg-primary hover:text-blue-600 text-light shadow"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchQuiz;
