import { useState, useEffect } from "react";
import { Risposta } from "../App";

interface ResultProps {
  risposte: Risposta[];
}

const Result = ({ risposte }: ResultProps) => {
  const [risultato, setRisultato] = useState<number>(0);

  useEffect(() => {
    const risposteCorrette = risposte
      .map((risposta) => {
        const isCorrect = risposta.risposta === risposta.valore;
        if (!isCorrect) return;
        return risposta;
      })
      .filter(Boolean);

    setRisultato((risposteCorrette.length * 100) / risposte.length);
  }, []);
  return (
    <div>
      <h1>Il tuo risultato : {risultato} %</h1>
    </div>
  );
};

export default Result;
