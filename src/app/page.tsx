'use client'

import React, { useEffect, useState } from "react";
import { GameGrid } from "@/GameGrid/GameGrid";
import { Input, Grid, Button, Message } from "semantic-ui-react";
import Keyboard from "react-simple-keyboard";
import _ from 'lodash';
import {
  validateWord,
  normalizeWord,
  calculateWin,
  getRandomInt,
  evaluateLetters,
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
  const [incorrectGuessedLetters, setIncorrectGuessedLetters] = useState<string[]>([]);
  const [correctGuessedLetters, setCorrectGuessedLetters] = useState<string[]>([]);
  const [misplacedGuessedLetters, setMisplacedGuessedLetters] = useState<string[]>([]);
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
    setIncorrectGuessedLetters([]);
    setCorrectGuessedLetters([]);
    setMisplacedGuessedLetters([]);
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

    const {
      correctLetters,
      misplacedLetters,
      incorrectLetters
    } = evaluateLetters(normalizedWord, correctWord);

    // Union existing arrays of letters with recently guessed word
    const newCorrectLetters = _.union([...correctGuessedLetters], correctLetters);
    setCorrectGuessedLetters(newCorrectLetters);
    setIncorrectGuessedLetters(_.union([...incorrectGuessedLetters], incorrectLetters));

    // Remove any misplaced letters that have since been guessed in the correct position
    setMisplacedGuessedLetters(
      _.union([...misplacedGuessedLetters], misplacedLetters).filter(letter => {
        return !newCorrectLetters.includes(letter);
      })
    );
    
    const updatedWords = [...words, normalizedWord];
    setWords(updatedWords);
    const isWin = calculateWin(normalizedWord, correctWord);

    if (!isWin && updatedWords.length >= 6) {
      setIsLoser(true);
      return
    }

    setIsWinner(isWin);
  };

  const handleOnScreenKeyboardPress = (button: string) => {
    if (button === '{bksp}') {
      setUserInput(userInput.substring(0, userInput.length - 1));
    } else {
      setUserInput(`${userInput}${button}`);
    }
  }
 
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
    <Message
      negative
      header='Game Over'
      content={`The correct word was: ${correctWord}.`}
    />
  );

  const renderWinMessage = () => (
    <Message
      positive
      header='Congratulations!'
      content={`You guessed the word in ${words.length} attempts!`}
    />
  );

  return (
    <div className={styles['application-container']}>
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
          <Keyboard
            onKeyPress={handleOnScreenKeyboardPress}
            layout={{
              default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "Z X C V B N M",
                "{bksp}"
              ]
            }}
            buttonTheme={[
              {
                class: styles['incorrect-letters'],
                buttons: `${incorrectGuessedLetters.join(' ') || null}`
              },
              {
                class: styles['misplaced-letters'],
                buttons: `${misplacedGuessedLetters.join(' ') || null}`
              },
              {
                class: styles['correct-letters'],
                buttons: `${correctGuessedLetters.join(' ') || null}`
              },
            ]}
          />
        </Grid.Row>
        <Grid.Row>
          {(isWinner || isLoser) && renderNewGameButton()}
        </Grid.Row>
      </Grid>
    </div>
  );
}
