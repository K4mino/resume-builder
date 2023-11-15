"use client"
//import html2pdff from 'html2pdf.js'
import { useRef,useState } from 'react'
import Link from 'next/link'
import styles from './resume.module.css'
import Education from './sections/Education';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import SectionComponent from './sections/SectionComponent';
import { useFormState } from "../components/FormContext";
import Projects from './sections/Projects';

let html2pdf:any

if (typeof window !== 'undefined') {
    html2pdf = require('html2pdf.js');
}

export default function Resume() {
  const ref = useRef(null)
  const { formData } = useFormState();

  const [sections, setSections] = useState([
    {
      key:'education',
      element:<Education/>
    },
    {
      key:'experience',
      element:<Experience/>
    },
    {
      key:'skills',
      element: <Skills/>
    },
    {
      key:'projects',
      element:<Projects/>
    }
  ]);

  const Download = async() => {
    const opt = {
      margin: [0,10,0,0], // Margins in millimeters
      enableLinks:true,
      filename: 'resume.pdf', // The name of the PDF file
      image: { type: 'jpeg', quality: 0.98 }, // Image settings (JPEG format with 98% quality)
      html2canvas: { scale: 2 }, // HTML2Canvas settings (scale factor 2)
      jsPDF: {
        unit: 'mm', // Measurement unit (millimeters)
        format: 'a4', // Paper format (A4)
        orientation: 'portrait' // Page orientation (portrait)
      },
    };

    await html2pdf().from(ref.current).set(opt).save()
  }


  const handleDragStart = (e:React.DragEvent, sectionIndex:number) => {
    e.dataTransfer.setData('text/plain', sectionIndex.toString());
  };

  const handleDragOver = (e:React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e:React.DragEvent, targetSectionIndex:number) => {
    e.preventDefault();

    const sourceSectionIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);

    const updatedSections = [...sections];

    const [movedSection] = updatedSections.splice(sourceSectionIndex, 1);
    updatedSections.splice(targetSectionIndex, 0, movedSection);

    setSections(updatedSections);
  };


  //Touch devices
let touchStartIndex = -1;

const handleTouchStart = (e: React.TouchEvent, sectionIndex: number) => {
  e.preventDefault();
  touchStartIndex = sectionIndex;
};

const handleTouchMove = (e: React.TouchEvent) => {
  e.preventDefault();
};

const handleTouchEnd = (e: React.TouchEvent, targetSectionIndex: number) => {
  e.preventDefault();

  if (touchStartIndex === -1) {
    return; 
  }

  const updatedSections = [...sections];

  const movedSection = updatedSections.splice(touchStartIndex, 1);
  updatedSections.splice(targetSectionIndex, 0, ...movedSection);

  setSections(updatedSections);

  touchStartIndex = -1;
};

  return (
    <main className={styles.main}>
      <div>
        <button className={styles.btn}>
          <Link href={'/'}>Back</Link>
        </button>
        <button className={`${styles.btn} ${styles.download}`} onClick={Download}>Download</button>
      </div>
      <h2>You can drag and drop sections</h2>
      <div ref={ref} className={styles.resume}>
        <h1 className={styles.header}>{formData.fullname}</h1>
        <div className={styles.contacts}>
          <a href={formData.portfolio}>{formData.portfolio}</a>
          <a href={formData.linkedin}>{formData.linkedin}</a>
          <p>{formData.email}</p>
        </div>
        {sections.map((section, index) => (
        <SectionComponent
          key={section.key}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, index)}
          onTouchStart={(e) => handleTouchStart(e,index)}
          onTouchEnd={(e) => handleTouchEnd(e,index)}
          onTouchMove={(e) => handleTouchMove(e)}
        >
          {section.element}
        </SectionComponent>
      ))}
      </div>
    </main>
  )
}
