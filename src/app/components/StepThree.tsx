"use client";

import React from "react";
import { useFormState } from "./FormContext";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "./steps.module.css";
import Input from "./Input";
import NestedFields from "./NestedFields";

interface FormValues {
  firstname: string;
  lastname: string;
  portfolio: string;
  linkedin: string;
  email: string;
}

const StepThree = () => {
  const { handleNext, formData, setFormData, handlePrev } = useFormState();
  const { handleSubmit, register, control } = useForm({
    defaultValues: formData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const handleSubmitForm = (data: FormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    handleNext();
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <h1>Experience</h1>
        {fields.map(({ id }, i) => (
          <div className={styles.box} key={id}>
            <Input
              label="Company Name"
              regName={`experience.${i}.company`}
              register={register}
            />
            <Input
              label="Position"
              regName={`experience.${i}.position`}
              register={register}
            />
            <Input
              label="Start Date"
              regName={`experience.${i}.startDate`}
              register={register}
            />
            <Input
              label="End Date"
              regName={`experience.${i}.endDate`}
              register={register}
            />
            <NestedFields
              arrayName="experience"
              nestedArrayName="accomplishments"
              appendBtnText="Append Accomplishment"
              deleteBtnText="Delete Accomplishment"
              label="Accomplishments"
              nestIndex={i}
              {...{ control, register }}
            />
            <button
              className={`${styles.btn} ${styles.delete}`}
              onClick={() => remove(i)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.btn}
          onClick={() => append({ school: "", degree: "" })}
        >
          Add experience
        </button>
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

export default StepThree;
