import Question from "./components/Question";
import data from "./api/data.json";
import { useState } from "react";
import Result from "./components/Result";

export interface Risposta {
  domanda: string;
  valore: string;
  risposta: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [risposte, setRisposte] = useState<Risposta[]>([]);

  if (currentStep === null) {
    return (
      <>
        <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray">
          <h1 className="text-xl mb-10">Quiz Patente 2023</h1>

          <button
            className="bg-orange w-32 h-10 rounded-md hover:bg-red transition duration-150 ease-out hover:ease-in"
            onClick={() => setCurrentStep(0)}
          >
            START QUIZ
          </button>
        </div>
      </>
    );
  }

  if (currentStep > data.domande.length - 1) {
    return <Result risposte={risposte} />;
  }
  return (
    <div className="grid items-center ">
      {currentStep >= 0 && (
        <Question
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setRisposte={setRisposte}
          risposte={risposte}
        />
      )}
    </div>
  );
}

export default App;
