import React from "react";
import { LetterSquare } from "@/LetterSquare/LetterSquare";
import { LetterSquareStatus } from "@/LetterSquare/LetterSquareStatus.enum";
import { WordRowProps } from "./WordRowProps.interface";

export const WordRow = ({
  word = '',
  isSubmitted = false,
  correctWord = ''
}: WordRowProps) => {
  const determineLetterStatus = (position: number) => {
    // Base Case
    if (!isSubmitted || correctWord.length !== 5 || position > 4 || position < 0) {
      return LetterSquareStatus.UNSUBMITTED;
    }

    const currentLetter: string = word.charAt(position);

    // Case where letter is not in the correct word
    if (correctWord.indexOf(currentLetter) === -1) {
      return LetterSquareStatus.INCORRECT;
    }

    // Check if letter is in exact position
    if (currentLetter === correctWord.charAt(position)) {
      return LetterSquareStatus.CORRECT;
    }

    // Case where current letter is repeated in user's word
    const isRepeatLetter = word.indexOf(currentLetter) !== position 
      || word.lastIndexOf(currentLetter) !== position;
    if (isRepeatLetter) {
      const numRepeats = (word.match(new RegExp(currentLetter, 'g')) || []).length;
      const numMatchesInCorrectWord = (correctWord.match(new RegExp(currentLetter, 'g')) || []).length;
      
      // Case where user repeats letter more than it occurs in correct word
      if (numRepeats > numMatchesInCorrectWord) {
        /**
         * Edge case: generally, when the user's word repeats the same letter more
         * than it occurs in the correct word and we have reached this check, the
         * status should be "incorrect." However, in the event that the user's word
         * has 3 repeats and 0-1 of them are in the correct position, we need to
         * ensure that the first two occurrences of the letter in the user's word 
         * are given the correct status. If the letter is in the correct position,
         * it will have passed an earlier check. This condition will ensure that 
         * the last index of the letter is the one that is marked "incorrect" while
         * the first two are given the correct status. 
         */
        if (numMatchesInCorrectWord === 2 && numRepeats === 3 
          && word.lastIndexOf(currentLetter) !== position) {
            return LetterSquareStatus.MISPLACED;
        } 
        
        return LetterSquareStatus.INCORRECT;
      } 
    }

    return LetterSquareStatus.MISPLACED;  
  };

  return (
    <div>
      {[...Array(5)].map((i, index) => (
        <LetterSquare 
          key={`${word}_${index}`}
          letter={word.charAt(index)}
          letterStatus={determineLetterStatus(index)}
        />
      ))}
    </div>
  )
};
