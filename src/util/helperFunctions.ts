// Validate word using regex
// Word must be a capital letter (A-Z) of length 5
export const validateWord = (word: string) => {
  return /^[A-Z]{5}$/.test(word);
};

// Transform word to upper case without leading/trailing spaces
export const normalizeWord = (word: string) => {
  return word.trim().toUpperCase();
};

// Determine if user's word matches the correct word for the game
export const calculateWin = (userWord: string, correctWord: string) => {
  return userWord === correctWord;
};

// Determine placement status of letters in user's word and return array representations
export const evaluateLetters = (userWord: string, correctWord: string) => {
  const correctLetters: string[] = [];
  const incorrectLetters: string[] = [];
  const misplacedLetters: string[] = [];

  for (let i = 0; i < userWord.length; i++) {
    if (userWord.charAt(i) === correctWord.charAt(i) 
      && !correctLetters.includes(userWord.charAt(i))) {
      correctLetters.push(userWord.charAt(i));
    } else if (new RegExp(userWord.charAt(i)).test(correctWord)
      && !misplacedLetters.includes(userWord.charAt(i))) {
        misplacedLetters.push(userWord.charAt(i));
    } else if (!incorrectLetters.includes(userWord.charAt(i))) {
      incorrectLetters.push(userWord.charAt(i));
    }
  }

  return {
    correctLetters,
    incorrectLetters,
    misplacedLetters,
  };
};

// Returns random integer in a given range
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
