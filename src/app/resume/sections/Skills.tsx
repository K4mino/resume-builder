"use client";
import React from "react";
import styles from "../resume.module.css";
import { useFormState } from "../../components/FormContext";
interface SkillsItem {
  topic:string,
  skills:string[]
}

const Skills = () => {
  const { formData } = useFormState();
  
  if(!formData.skillList.length){
    return null
  }

  return (
    <div className={styles.skillWrapper}>
      <div className={styles.sectionHeader}>Skills</div>
      {formData?.skillList.map((item:SkillsItem, i: number) => (
        <div className={styles.skillItem} key={item.topic}>
          <b>{item.topic}:</b>
          {
            item.skills.map((skill) => (
              <p key={skill}>{skill},</p>
            ))
          }
        </div>
      ))}
    </div>
  );
};

export default Skills;
