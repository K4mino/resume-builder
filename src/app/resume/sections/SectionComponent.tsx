"use client"
import React from "react";
interface SectionProps {
    children: React.ReactNode, 
    onDragStart: (e:React.DragEvent) => void, 
    onDragOver:(e:React.DragEvent) => void,
    onDrop:(e:React.DragEvent) => void,
    onTouchStart:(e:React.TouchEvent) => void,
    onTouchEnd:(e:React.TouchEvent) => void,
    onTouchMove:(e:React.TouchEvent) => void,
}

const SectionComponent:React.FC<SectionProps> = ({ children,onDragOver, onDragStart,onDrop,onTouchStart,onTouchEnd, onTouchMove }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e)}
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => onDragOver(e)}
      onTouchStart={(e) => onTouchStart(e)}
      onTouchEnd={(e) => onTouchEnd(e)}
      onTouchMove={(e) => onTouchMove(e)}
    >
      {children}
    </div>
  );
};

export default SectionComponent;