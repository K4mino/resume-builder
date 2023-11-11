"use client";

import React from "react";
import { useFormState } from "./FormContext";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "./steps.module.css";
import Input from "./Input";
import NestedSkills from "./NestedSkills";


interface Skill {
  topic: string;
  list: string;
}

interface FormValues {
  skills: Skill[];
}

const StepFour = () => {
  
  const { handleNext, formData, setFormData,handlePrev } = useFormState();
  const { handleSubmit, register, control } = useForm({
    defaultValues: formData,
  });

  const handleSubmitForm = (data: FormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    handleNext()
  };
  
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skillList",
  });


  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
      <h1>Skills</h1>
        {fields.map(({ id }, i) => (
          <div className={styles.skillTopicWrapper} key={id}>
            <Input
              label="Skill Topic"
              regName={`skillList.${i}.topic`}
              register={register}
            />
            <NestedSkills nestIndex={i} {...{ control, register }} />
            <button
              className={`${styles.btn} ${styles.delete}`}
              onClick={() => remove(i)}
            >
              Delete skill topic
            </button>
          </div>
        ))}
        <button type='button' className={styles.btn} onClick={() => append({topic:'',skills:[]})}>Add skill topic</button>
        <button type="button" className={styles.btn} onClick={handlePrev}>
          Previous
        </button>
        <button type="submit" className={styles.btn}>
           Next
        </button>
      </form>
    </div>
  );
};

export default StepFour;
