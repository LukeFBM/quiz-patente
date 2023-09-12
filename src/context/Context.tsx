import { useContext, createContext, useState } from "react";
import { Data, Risposta } from "../lib/types";
import data from "../api/new_data.json";

export interface IGlobalContext {
  currentStep: number | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
  setRisposte: React.Dispatch<React.SetStateAction<Risposta[]>>;
  risposte: Risposta[];
  currentSection: number | null;
  setCurrentSection: React.Dispatch<React.SetStateAction<number | null>>;
  risultato: number;
  setRisultato: React.Dispatch<React.SetStateAction<number>>;
  data: Data;
}

const GlobalContext = createContext<IGlobalContext>({
  currentStep: null,
  setCurrentStep: () => {},
  setRisposte: () => {},
  risposte: [],
  currentSection: null,
  setCurrentSection: () => {},
  risultato: 0,
  setRisultato: () => {},
  data: { data: [] },
});

interface AppContextProps {
  children: React.ReactNode;
}

const AppContext = ({ children }: AppContextProps) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const [risposte, setRisposte] = useState<Risposta[]>([]);
  const [risultato, setRisultato] = useState<number>(0);

  const value = {
    currentStep,
    setCurrentStep,
    currentSection,
    risposte,
    setCurrentSection,
    setRisposte,
    risultato,
    setRisultato,
    data,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default AppContext;

export const useGlobalContext = () => useContext(GlobalContext);
