import { useForm } from "react-hook-form";
import Radio from "./Radio";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "../context/Context";

interface DomandaFormData {
  risposta: string;
}

const DomandaFormSchema = yup.object().shape({
  risposta: yup.string().required("campo obbligatorio"),
});

const Domanda = () => {
  const {
    currentSection: _currentSection,
    setCurrentSection,
    currentStep: _currentStep,
    risposte,
    setRisposte,
    setCurrentStep,
    data,
  } = useGlobalContext();

  const currentSection = _currentSection ?? 0;
  const currentStep = _currentStep ?? 0;

  const currentQuestion = data.data[currentSection].domande[currentStep];
  const sectionDomande = data.data[currentSection].domande;

  const form = useForm<DomandaFormData>({
    resolver: yupResolver(DomandaFormSchema),
  });

  const handleSave = ({ risposta }: DomandaFormData) => {
    if (currentStep === sectionDomande.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(null);
      return;
    }
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

export default Domanda;
