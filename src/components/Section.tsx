import { useGlobalContext } from "../context/Context";

const Section = () => {
  const { currentSection, setCurrentStep, data } = useGlobalContext();
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray">
      <h1 className="text-xl mb-8">{data.data[currentSection ?? 0].title}</h1>
      <button
        className="bg-orange w-32 h-10 rounded-md hover:bg-red transition duration-150 ease-out hover:ease-in"
        onClick={() => setCurrentStep(0)}
      >
        Inizia
      </button>
    </div>
  );
};

export default Section;
