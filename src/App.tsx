import Result from "./components/Result";
import Domanda from "./components/Domanda";
import { useGlobalContext } from "./context/Context";
import Section from "./components/Section";
import Starter from "./components/Starter";

export interface Risposta {
  domanda: string;
  valore: string;
  risposta: string;
}

function App() {
  const { currentSection, currentStep, data } = useGlobalContext();

  if (currentSection === null) return <Starter />;
  if (currentStep === null && currentSection !== null) return <Section />;
  if (currentSection > data.data.length - 1) return <Result />;

  return <Domanda />;
}

export default App;
