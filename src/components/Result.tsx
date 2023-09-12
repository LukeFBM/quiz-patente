import { useEffect } from "react";
import { useGlobalContext } from "../context/Context";

const Result = () => {
  const { risposte, setRisultato, risultato } = useGlobalContext();

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
    <div className="flex flex-col font-bold text-2xl justify-center items-center h-screen bg-gray">
      <h1 className={risultato < 50 ? "text-red" : "text-green"}>
        Il tuo risultato : {risultato.toFixed(2)} %
      </h1>
    </div>
  );
};

export default Result;
