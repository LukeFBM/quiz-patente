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
      <div>
        <p>{currentQuestion.domanda}</p>
        <div>
          <Radio form={form} label="Vero" value="true" />
          <Radio form={form} label="Falso" value="false" />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <button onClick={form.handleSubmit(handleSave)}>Submit</button>
      </div>
    </form>
  );
};

export default Question;
