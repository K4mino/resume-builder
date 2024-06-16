"use client";
import React from "react";
import styles from "../resume.module.css";
import { useFormState } from "../../components/FormContext";
type EducationItem = {
  school:string;
  degree:string;
  startDate:string;
  endDate:string;
}

const Education = () => {
  const { formData } = useFormState();

  if(!formData.educations.length){
    return null
  }

  return (
    <div className={styles.education}>
      <div className={styles.sectionHeader}>Education</div>
      {formData?.educations.map((item:EducationItem, i:number) => (
        <div key={i} className={styles.listItem}>
          <div className={styles.listItemTitle}>
            <b>{item.school}</b>
            <i>{item.degree}</i>
          </div>
          <div className={styles.listItemDate}>{item.startDate} - {item.endDate}</div>
        </div>
      ))}
    </div>
  );
};

export default Education;
