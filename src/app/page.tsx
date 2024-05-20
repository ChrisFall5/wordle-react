'use client'

import React, { useEffect, useState } from "react";
import { GameGrid } from "@/GameGrid/GameGrid";
import { Input, Grid, Button, Message } from "semantic-ui-react";
import {
  validateWord,
  normalizeWord,
  calculateWin,
  getRandomInt,
} from "@/util/helperFunctions";
import { WordBank } from "@/util/fiveLetterWords";

import styles from './page.module.css';

export default function Home() {
  const [isNewGame, setIsNewGame] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    setIsNewGame(true);
  }, []);

  useEffect(() => {
    if (isNewGame) {
      const randomWordIndex = getRandomInt(0, WordBank.length);
      const newCorrectWord = WordBank[randomWordIndex];
      setCorrectWord(newCorrectWord.toUpperCase());
      setIsNewGame(false);
    }
  }, [isNewGame]);

  const startNewGame = () => {
    setIsWinner(false);
    setIsLoser(false);
    setHasError(false);
    setUserInput('');
    setWords([]);
    setIsNewGame(true);
  }

  const submitWord = (word: string) => {
    const normalizedWord = normalizeWord(word);
    const isWordValid = validateWord(normalizedWord);

    if (!isWordValid || words.includes(normalizedWord)) {
      setHasError(true);
      return;
    } else if (hasError) {
      setHasError(false);
    }

    setUserInput('');
    
    const updatedWords = [...words, normalizedWord];
    setWords(updatedWords);
    const isWin = calculateWin(normalizedWord, correctWord);

    if (!isWin && updatedWords.length >= 6) {
      setIsLoser(true);
      return
    }

    setIsWinner(isWin);
  };

  const renderNewGameButton = () => (
    <Button
      primary
      onClick={() => startNewGame()}
    >
      Play Again
    </Button>
  );

  const renderInput = () => (
    <>
      <Input
        type='text'
        placeholder='Enter Text...'
        onChange={(e) => setUserInput(e.target.value.toUpperCase())}
        disabled={isWinner || isLoser}
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
    <Message 
      negative
      header='Invalid input provided.'
      content={(
        <ul className={styles['error-message-content']}>
          <li>Words must be 5 letters long.</li>
          <li>Words cannot contain numbers or special characters.</li>
          <li>Word cannot have been previously guessed.</li>
        </ul>
      )}
    />
  );

  const renderLossMessage = () => (
    <Message negative>
      {`Game Over. The correct word was: ${correctWord}.`}
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
        {isLoser && renderLossMessage()}
      </Grid.Row>
      <Grid.Row>
        {(isWinner || isLoser) && renderNewGameButton()}
      </Grid.Row>
    </Grid>
  );
}
