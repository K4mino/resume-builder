"use client"
import React from 'react'
import styles from "../resume.module.css";
import { useFormState } from "../../components/FormContext";
interface ProjectsItem {
    projectName:string,
    stack:string,
    description:string[]
  }
  

const Projects = () => {
    const { formData } = useFormState();

    if(!formData.projects.length){
        return null
    }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>Projects</div>
      {formData?.projects.map((item:ProjectsItem, i:number) => (
        <>
          <div className={styles.listItem}>
            <div>{item.projectName} | {item.stack}</div>
          </div>
          <ul className={styles.list}>
            {
              item.description.map((desc) => (
                <li key={desc}>{desc}</li>
              ))
            }
          </ul>
        </>
      ))}
    </div>
  )
}

export default Projects