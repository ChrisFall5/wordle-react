import React from "react";
import { LetterSquareProps } from "./LetterSquareProps.interface";
import { LetterSquareStatus } from "./LetterSquareStatus.enum";

import styles from './LetterSquare.module.css';

export const LetterSquare = ({
  letter = '',
  letterStatus = LetterSquareStatus.UNSUBMITTED
}: LetterSquareProps) => {

  return (
    <div className={styles['letter-square']} style={{ backgroundColor: letterStatus}}>
      <h1> {letter} </h1>
    </div>
  )
};
