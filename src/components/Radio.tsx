import { UseFormReturn } from "react-hook-form";

interface RadioProps {
  value: string;
  label: string;
  form: UseFormReturn<any>;
}

const Radio = ({ form, label, value }: RadioProps) => {
  return (
    <div>
      <input
        type="radio"
        id="risposta"
        value={value}
        {...form.register("risposta")}
      />
      <label htmlFor="risposta">{label}</label>
    </div>
  );
};

export default Radio;
