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
    return <button onClick={() => setCurrentStep(0)}>START QUIZ</button>;
  }

  if (currentStep > data.domande.length - 1) {
    return <Result risposte={risposte} />;
  }
  return (
    <div className="grid items-center h-screen">
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
