import React from "react";
import { Modal } from "semantic-ui-react";
import { GameModalProps } from "./GameModalProps.interface";

export const GameModal = ({
  isOpen = false,
  headerText = '',
  content = '',
  renderNewGameButton,
}: GameModalProps) =>  (
  <Modal
    open={isOpen}
    centered
    dimmer
    size="tiny"
  >
    <Modal.Header>{headerText}</Modal.Header>
    <Modal.Content>{content}</Modal.Content>
    <Modal.Actions>
      {renderNewGameButton()}
    </Modal.Actions>
  </Modal>
);