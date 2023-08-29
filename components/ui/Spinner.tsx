const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-dark/60 flex justify-center items-center z-50">
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light font-bold">
        <span className="text-secondary">Quizz</span>
        App
      </p>
      <div className="w-28 aspect-square rounded-full border-8 border-dashed border-secondary drop-shadow-lg animate-spin"></div>
    </div>
  );
};

export default Spinner;
