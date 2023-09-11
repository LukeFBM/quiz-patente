import data from "../api/data.json";
import { useForm } from "react-hook-form";
import Radio from "./Radio";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Risposta } from "../App";

interface QuestionProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | null>>;
  setRisposte: React.Dispatch<React.SetStateAction<Risposta[]>>;
  risposte: Risposta[];
}

interface QuestionFormData {
  risposta: string;
}

const QuestionFormSchema = yup.object().shape({
  risposta: yup.string().required("campo obbligatorio"),
});

const Question = ({
  setCurrentStep,
  currentStep,
  setRisposte,
  risposte,
}: QuestionProps) => {
  const currentQuestion = data.domande[currentStep];

  const form = useForm<QuestionFormData>({
    resolver: yupResolver(QuestionFormSchema),
  });

  const handleSave = ({ risposta }: QuestionFormData) => {
    setCurrentStep(currentStep + 1);
    const newRisposta = {
      domanda: data.domande[currentStep].domanda,
      valore: data.domande[currentStep].valore.toString(),
      risposta,
    };
    setRisposte([...risposte, newRisposta]);
    form.reset();
  };

  const error = form.formState.errors.risposta?.message;

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

export default Question;
