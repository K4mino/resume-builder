"use client"

import React from 'react'
import {useFormState} from "./FormContext";
import {useFieldArray, useForm} from "react-hook-form";
import Input from './Input';
import styles from "./steps.module.css";

interface FormValues {
  school:string,
  
}

const StepTwo = () => {
  const { handleNext,formData, setFormData,handlePrev} = useFormState();
  const {handleSubmit,register,control} = useForm({
        defaultValues:formData
    });

  const {fields,append,remove} = useFieldArray({
    control,
    name:"educations"
  })

  const handleSubmitForm = (data:FormValues) => {
    setFormData((prev:any) => ({...prev,...data}))
    handleNext()
  }


  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <h1>Education</h1>
        {
          fields.map(({id},i) => (
            <div className={styles.formFields}  key={id}>
              <Input label='School' regName={`educations.${i}.school`} register={register}/>
              <Input label='Degree' regName={`educations.${i}.degree`} register={register}/>
              <Input label='Start Date' regName={`educations.${i}.startDate`}  register={register}/>
              <Input label='End Date' regName={`educations.${i}.endDate`} register={register}/>
              <button className={`${styles.btn} ${styles.delete}`} onClick={() => remove(i)}>Delete Education</button>
            </div>
          ))
        }
          <button type='button' className={`${styles.btn} ${styles.add}`} onClick={() => append({school:'',degree:''})}>Add education</button>
          <div className={styles.buttonBox}>
            <button type='button' className={`${styles.btn} ${styles.switch}`} onClick={handlePrev}>Previous</button>
            <button type='submit' className={`${styles.btn} ${styles.switch}`}>Next</button>
          </div>
      </form>
    </div>
  )
}

export default StepTwo