This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

This project is designed to be a clone of the game Wordle (with a few variations) from the New York Times written in React using Next.js.

### Game Rules

1. Users can submit up to 6 guesses to determine the correct word for the game. 
2. Unlike the traditional Wordle game, submitted words DO NOT need to be real English words.
3. Submitted words must be 5 characters in length.
4. Submitted words cannot contain special characters or numbers. 
5. Guessed words cannot be repeated.
6. Letters guessed in the correct position of the word will have a green background color.
7. Letters that are in the correct word, but out of position, will have a yellow background color.
8. Letters guessed that are not in the correct word at all will have a grey background color.


## Try It Online

The latest version of the game can be played here: https://wordle-react-omega.vercel.app

See section below for information about deploying code with Vercel.

## Getting Started

### Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
