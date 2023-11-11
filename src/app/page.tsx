"use client";
import React from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import { useFormState } from "./components/FormContext"
import styles from "./page.module.css";

export default function Home() {

  function ActiveStepFormComponent() {
    const { step } = useFormState();
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour/>;
      case 5:
        return <StepFive/>;
      default:
        return null;
    }
  }

  return (
    <div className={styles.wrapper}>
      <ActiveStepFormComponent/>
    </div>
  );
}