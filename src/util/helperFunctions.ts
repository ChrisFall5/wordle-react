// Validate word using regex
// Word must be a capital letter (A-Z) of length 5
export const validateWord = (word: string) => {
  return /^[A-Z]{5}$/.test(word);
};

// Transform word to upper case without leading/trailing spaces
export const normalizeWord = (word: string) => {
  return word.trim().toUpperCase();
};

export const calculateWin = (userWord: string, correctWord: string) => {
  return userWord === correctWord;
};
