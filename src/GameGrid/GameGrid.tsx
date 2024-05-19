import React from "react";
import { WordRow } from "@/WordRow/WordRow";
import { GameGridProps } from "./GameGridProps.interface";

import styles from './GameGrid.module.css';

export const GameGrid = ({
  words = [],
  correctWord = ''
}: GameGridProps) => {

  return (
    <div className={styles['game-grid']}>
      {[...Array(6)].map((i, index) => (
        <WordRow 
          word={words[index] || ''}
          isSubmitted={words.length > index}
          correctWord={correctWord}
          key={`row-${index}`}
        />
      ))}
    </div>
  );
};
