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

// Returns random integer in a given range
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
