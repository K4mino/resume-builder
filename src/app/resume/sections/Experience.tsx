"use client";
import React from "react";
import styles from "../resume.module.css";
import { useFormState } from "../../components/FormContext";

interface ExperienceItem {
  company:string,
  position:string,
  startDate:string,
  endDate:string,
  accomplishments:string[]
}

const Experience = () => {
  const { formData } = useFormState();

  if(!formData.experience.length){
    return null
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>Experience</div>
      {formData?.experience.map((item:ExperienceItem, i:number) => (
        <div key={i}>
          <div className={styles.listItem}>
            <div className={styles.listItemTitle}>{item.company} | {item.position}</div>
            <div className={styles.listItemDate}>{item.startDate} - {item.endDate}</div>
          </div>
          <ul className={styles.list}>
            {
              item.accomplishments.map((acc) => (
                <li key={acc}>{acc}</li>
              ))
            }
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Experience;
