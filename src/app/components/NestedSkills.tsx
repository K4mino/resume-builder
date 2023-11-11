"use client"
import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import Image from 'next/image';
import styles from "./steps.module.css";

interface SkillProps {
  nestIndex: number;
  control: Control;
  register: any;
}

const Skill: React.FC<SkillProps> = ({ nestIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `skillList.${nestIndex}.skills`,
  });

  return (
    <>
    <div className={styles.skillsWrapper}>
      {fields.map(({id}, i) => {
        return (
        <div className={styles.skillPoint} key={id}>
          <input
            autoComplete='off'
            className={styles.input}
            type="text"
            placeholder='React'
            required
            {...register(`skillList.${nestIndex}.skills.${i}`)}
          />
          <button className={`${styles.btn} ${styles.deleteSkill}`}  type="button" onClick={() => remove(i)}>
            ✖
          </button>
        </div>
      )
        })}
    </div>
      <button className={styles.btn} type="button" onClick={() => append('')}>
        Add Skill
      </button> 
    </>
  );
};

export default Skill;

