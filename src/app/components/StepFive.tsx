"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
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

const StepFive = () => {
    const router = useRouter();

    const { formData, setFormData, handlePrev } = useFormState();
    const { handleSubmit, register, control } = useForm({
      defaultValues: formData,
    });
  
    const { fields, append, remove } = useFieldArray({
      control,
      name: "projects",
    });
  
    const handleSubmitForm = (data: FormValues) => {
      setFormData((prev: any) => ({ ...prev, ...data }));
      router.push('/resume');
    };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <h1>Projects</h1>
        {fields.map(({ id }, i) => (
          <div className={styles.box} key={id}>
            <Input
              label="Project Name"
              regName={`projects.${i}.projectName`}
              register={register}
            />
            <Input
              label="Tech stack"
              regName={`projects.${i}.stack`}
              register={register}
            />
            <NestedFields
              arrayName="projects"
              nestedArrayName="description"
              appendBtnText="Add description"
              deleteBtnText="Delete description"
              label="Description"
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
          className={`${styles.btn} ${styles.add}`}
          onClick={() => append({})}
        >
          Add Project
        </button>
        <button type="button" className={styles.btn} onClick={handlePrev}>
          Previous
        </button>
        <button type="submit" className={styles.btn}>
          Preview resume
        </button>
      </form>
    </div>
  )
}

export default StepFive