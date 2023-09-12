import data from "../api/new_data.json";
import { useForm } from "react-hook-form";
import Radio from "./Radio";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Risposta } from "../App";
import { Sezione } from "../lib/types";

interface SectionProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
  setRisposte: React.Dispatch<React.SetStateAction<Risposta[]>>;
  risposte: Risposta[];
  currentSection: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number | null>>;
}

interface SectionFormData {
  risposta: string;
}

const SectionFormSchema = yup.object().shape({
  risposta: yup.string().required("campo obbligatorio"),
});

const Section = ({
  currentSection,
  setCurrentSection,
  setCurrentStep,
  currentStep,
  setRisposte,
  risposte,
}: SectionProps) => {
  const sections = data.data as Sezione[];
  const currentQuestion = data.data[currentSection].domande[currentStep];
  const sectionDomande = data.data[currentSection].domande;

  const form = useForm<SectionFormData>({
    resolver: yupResolver(SectionFormSchema),
  });

  const handleSave = ({ risposta }: SectionFormData) => {
    if (currentStep === sectionDomande.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(null);
      return;
    }
    // se la current section è maggiore del numero di sezioni disponibile, manda result
    setCurrentStep(currentStep + 1);
    const newRisposta = {
      domanda: currentQuestion.domanda,
      valore: currentQuestion.valore.toString(),
      risposta,
    };
    setRisposte([...risposte, newRisposta]);
    form.reset();
  };

  const error = form.formState.errors.risposta?.message;

  if (currentStep === null) {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray">
        <h1 className="text-xl mb-8">{data.data[currentSection].title}</h1>
        <button
          className="bg-orange w-32 h-10 rounded-md hover:bg-red transition duration-150 ease-out hover:ease-in"
          onClick={() => setCurrentStep(0)}
        >
          Inizia
        </button>
      </div>
    );
  }

  return (
    <form>
      <div className="grid justify-items-center gap-4 rounded-md h-full m-8 p-20 bg-gray">
        <h1 className="text-xl mb-8">Domanda n. {currentStep + 1}</h1>
        <p>{currentQuestion.domanda}</p>
        <div className="flex gap-2">
          <Radio form={form} label="Vero" value="true" />
          <Radio form={form} label="Falso" value="false" />
        </div>
        {error && <p className="text-red">{error.toUpperCase()}</p>}

        <button
          className="bg-orange w-32 h-10 rounded-md hover:bg-red transition duration-150 ease-out hover:ease-in"
          onClick={form.handleSubmit(handleSave)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Section;
