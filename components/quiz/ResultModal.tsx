import { Participant } from '@/types';

type ResultModalProps = {
  title: string;
  result: Participant[];
  onModalClose: () => void;
};

const ResultModal: React.FC<ResultModalProps> = ({
  title,
  result,
  onModalClose,
}) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center animate-fadeIn">
      <div className="w-[500px] max-h-[360]px overflow-y-auto bg-light rounded-lg flex flex-col gap-3 py-4 px-8 shadow-lg animate-slideUp">
        {/* titulo */}
        <h3 className="text-xl text-primary font-bold">{title}</h3>

        {/* cuerpo */}
        <div className="flex flex-col gap-1 text-dark">
          {result.map((participant, index) => (
            <p key={index} className="bg-gray-200 py-1 px-2 rounded">
              <span className="font-bold text-primary">{index + 1}</span>.{' '}
              {participant.username} - {participant.score} preguntas correctas.
            </p>
          ))}
        </div>

        {/* botones */}

        <div className="flex justify-end">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-dark py-1 px-2 rounded-md transition"
            onClick={onModalClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
