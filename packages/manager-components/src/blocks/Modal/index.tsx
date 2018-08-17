import React, { Fragment, StatelessComponent } from 'react';
import ReactModal from 'react-modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';

import styles from './styles.css';

export interface ModalProps {
  isOpen?: boolean;
  title?: string;
  body?: string;
  primaryInteraction?: () => void;
  secondaryInteraction?: () => void;
  interactionHandler?: () => void;
  handleSubmit?: () => void;
  onAfterOpen?: () => void;
  loading?: boolean;
  error?: boolean;
}

const renderButtons = (
  primaryInteraction,
  secondaryInteraction,
  interactionHandler,
) => {
  const onClick = (event, handler) => {
    interactionHandler(event, handler);
  };

  return secondaryInteraction ? (
    <div className="modal__actions">
      <div className="modal__action">
        <Button
          style="secondary"
          buttonValue={secondaryInteraction}
          onClick={onClick}
        >
          {secondaryInteraction}
        </Button>
      </div>
      <div className="modal__action">
        <Button buttonValue={primaryInteraction} onClick={onClick}>
          {primaryInteraction}
        </Button>
      </div>
    </div>
  ) : (
    primaryInteraction && (
      <Button buttonValue={primaryInteraction} onClick={onClick}>
        {primaryInteraction}
      </Button>
    )
  );
};

const Modal: StatelessComponent<ModalProps> = ({
  isOpen,
  title,
  body,
  primaryInteraction,
  secondaryInteraction,
  interactionHandler,
  handleSubmit,
  onAfterOpen,
  children,
  loading,
  error,
}) => {
  return (
    <ReactModal
      className="modal__content"
      overlayClassName="modal__overlay"
      onAfterOpen={onAfterOpen}
      isOpen={isOpen}
    >
      <style jsx>{styles}</style>
      <h3>{title}</h3>
      <p>{body}</p>
      <Form onSubmit={handleSubmit}>
        {children}

        {!loading ? (
          renderButtons(
            primaryInteraction,
            secondaryInteraction,
            interactionHandler,
          )
        ) : (
          <Fragment>Loading</Fragment>
        )}
      </Form>
    </ReactModal>
  );
};

export default Modal;
