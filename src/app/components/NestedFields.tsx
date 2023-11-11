"use client";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { UseFormRegister, FieldValues, Control } from "react-hook-form";
import styles from "./steps.module.css";


interface NestedFieldsProps {
  nestIndex: number;
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  label: string;
  deleteBtnText: string;
  appendBtnText: string;
  arrayName: string;
  nestedArrayName: string;
}

const NestedFields: React.FC<NestedFieldsProps> = ({
  nestIndex,
  control,
  register,
  label,
  deleteBtnText,
  appendBtnText,
  arrayName,
  nestedArrayName,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `${arrayName}.${nestIndex}.${nestedArrayName}`,
  });

  return (
    <div>
      {fields.map(({ id }, i) => {
        return (
          <div key={id}>
            <label>{label}:</label>
            <input
              className={styles.input}
              {...register(`${arrayName}.${nestIndex}.${nestedArrayName}.${i}`)}
            />
            <button
              className={`${styles.btn} ${styles.delete}`}
              type="button"
              onClick={() => remove(i)}
            >
              {deleteBtnText}
            </button>
          </div>
        );
      })}
      <button className={styles.btn} type="button" onClick={() => append("")}>
        {appendBtnText}
      </button>
    </div>
  );
};

export default NestedFields;
