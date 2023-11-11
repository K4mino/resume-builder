import React from 'react'
import styles from "./steps.module.css";
import {UseFormRegister, FieldValues } from 'react-hook-form'

interface InputProps {
    label:string,
    regName:string,
    register: UseFormRegister<FieldValues>
}

const Input:React.FC<InputProps> = ({label,regName,register}) => {

  return (
    <div className={styles.inputBox}>
        <input
          autoComplete='off'
          placeholder={label} 
          id={regName} 
          className={styles.input}
          type="input"  
          {...register(regName)}/>
        <label className={styles.label} htmlFor={regName}>{label}</label>
    </div>
  )
}

export default Input