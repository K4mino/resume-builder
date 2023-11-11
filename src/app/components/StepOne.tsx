"use client"

import React from 'react'
import {useFormState} from "./FormContext";
import {useForm} from "react-hook-form";
import styles from "./steps.module.css";
import Input from './Input';

interface FormValues {
    firstname:string,
    lastname:string,
    portfolio:string,
    linkedin:string,
    email:string
}

const StepOne = () => {
    const {step, handleNext,formData, setFormData} = useFormState();
    const {handleSubmit,register} = useForm({
        defaultValues:formData
    });

    const handleSubmitForm = (data:FormValues) => {
        setFormData((prev:any) => ({...prev,...data}))
        handleNext()
    }

  return (
    <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
            <h1>Info</h1>
            <Input label='Full Name' regName='fullname' register={register}/>
            <Input label='Portfolio' regName='portfolio' register={register}/>
            <Input label='LinkedIn' regName='linkedin' register={register}/>
            <Input label='Email' regName='email' register={register}/>
            <button className={styles.btn}>Next</button>
        </form> 
    </div>
  )
}

export default StepOne