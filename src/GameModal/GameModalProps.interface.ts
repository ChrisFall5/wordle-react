import { JSX } from "react";

export interface GameModalProps {
  isOpen: boolean,
  headerText: string,
  content: string,
  renderNewGameButton: () => JSX.Element,
}