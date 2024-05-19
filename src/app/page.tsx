'use client'

import React, { useState } from "react";
import { GameGrid } from "@/GameGrid/GameGrid";
import { Input, Grid, Button, Message } from "semantic-ui-react";
import { validateWord, normalizeWord, calculateWin } from "@/util/helperFunctions";

import styles from './page.module.css';

export default function Home() {
  // TODO: add back-end to determine the game's correct word
  const correctWord = 'SHUSH';

  const [hasError, setHasError] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [words, setWords] = useState<string[]>([]);


  const submitWord = (word: string) => {
    const normalizedWord = normalizeWord(word);
    const isWordValid = validateWord(normalizedWord);

    if (!isWordValid) {
      setHasError(true);
      return;
    } else if (hasError) {
      setHasError(false);
    }
    
    const updatedWords = [...words, normalizedWord];
    setWords(updatedWords);
    setIsWinner(calculateWin(normalizedWord, correctWord));
    setUserInput('');
  };

  const renderInput = () => (
    <>
      <Input
        type='text'
        placeholder='Enter Text...'
        onChange={(e) => setUserInput(e.target.value.toUpperCase())}
        disabled={isWinner}
        value={userInput}
        maxLength={5}
      />
      <Button 
        type='submit'
        primary
        onClick={() => submitWord(userInput)}
        disabled={isWinner || userInput.length < 5}
      >
        Submit
      </Button>
    </>
  );

  const renderErrorMessage = () => (
    // TODO: render validation error(s)
    <Message negative>
      Invalid input provided.
    </Message>
  );

  const renderWinMessage = () => (
    <Message positive>
      {`Congratulations, you guessed the word in ${words.length} attempts!`}
    </Message>
  );

  return (
    <Grid centered>
      <Grid.Row className={styles['game-container']}>
        <GameGrid words={words} correctWord={correctWord} />
      </Grid.Row>
      <Grid.Row>
        {renderInput()}
      </Grid.Row>
      <Grid.Row>
        {hasError && renderErrorMessage()}
        {isWinner && renderWinMessage()}
      </Grid.Row>
    </Grid>
  );
}
