"use client"
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styles from "./steps.module.css"


type TagsProps = {};

const Tags: React.FC<TagsProps> = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setSelectedTags([...selectedTags, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        {selectedTags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            {tag}
            <button className={`${styles.tag} ${styles.button}`} onClick={() => handleRemoveTag(tag)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
