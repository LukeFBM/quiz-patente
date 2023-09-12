import { useGlobalContext } from "../context/Context";

const Starter = () => {
  const { setCurrentSection } = useGlobalContext();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray">
      <h1 className="text-xl mb-10">Quiz Patente 2023</h1>

      <button
        className="bg-orange w-32 h-10 rounded-md hover:bg-red transition duration-150 ease-out hover:ease-in"
        onClick={() => setCurrentSection(0)}
      >
        START QUIZ
      </button>
    </div>
  );
};

export default Starter;
