import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'semantic-ui-css/semantic.min.css';
import 'react-simple-keyboard/build/css/index.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle-React",
  description: "A custom take on the game Wordle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
