"use client"
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface FormContext {
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
  handleNext: () => void;
  handlePrev: () => void;
  step: number;
}

interface Props {
    children: ReactNode
}

const FormContext = createContext<FormContext>({
  formData: {},
  handleNext: () => {},
  handlePrev: () => {},
  setFormData: () => {},
  step: 0,
});

export function FormProvider({ children }: Props) {
  const [formData, setFormData] = useState(
    {
      fullname:'',
      portfolio:'',
      linkedin:'',
      email:'',
      educations: [],
      experience: [],
      skillList: [],
      projects: []
    }
  );
  const [step, setStep] = useState(1);
  
  function handleNext() {
    setStep((prev) => prev + 1);
  }

  function handlePrev() {
    setStep((prev) => prev - 1);
  }

  return (
    <FormContext.Provider
      value={{ formData, setFormData, handleNext, handlePrev, step }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}