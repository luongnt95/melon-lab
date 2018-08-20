import React, { Fragment, StatelessComponent } from 'react';
import ReactModal from 'react-modal';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface ModalProps {
  isOpen?: boolean;
  title?: string;
  body?: string;
  primaryInteraction?: () => void;
  secondaryInteraction?: () => void;
  interactionHandler?: () => void;
  onAfterOpen?: () => void;
  handleSubmit?: () => void;
  loading?: boolean;
  error?: boolean;
}

const renderButtons = (
  primaryInteraction,
  secondaryInteraction,
  interactionHandler,
) => {
  const onClickPrimaryInteraction = event => {
    interactionHandler(event, primaryInteraction);
  };

  const onClickSecondaryInteraction = event => {
    interactionHandler(event, secondaryInteraction);
  };

  return secondaryInteraction ? (
    <div className="modal__actions">
      <div className="modal__action">
        <Button
          type="button"
          style="secondary"
          onClick={onClickSecondaryInteraction}
        >
          {secondaryInteraction}
        </Button>
      </div>
      <div className="modal__action">
        <Button type="submit" onClick={onClickPrimaryInteraction}>
          {primaryInteraction}
        </Button>
      </div>
    </div>
  ) : (
    primaryInteraction && (
      <Button type="submit" onClick={onClickPrimaryInteraction}>
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
  onAfterOpen,
  children,
  loading,
  error,
  handleSubmit,
}) => {
  return (
    <ReactModal
      className="modal__content"
      overlayClassName="modal__overlay"
      onAfterOpen={onAfterOpen}
      isOpen={isOpen}
    >
      <style jsx>{styles}</style>
      <h3 className="modal__title">{title}</h3>
      <p>{body}</p>
      {children}

      {!loading ? (
        <Form onSubmit={handleSubmit}>
          {renderButtons(
            primaryInteraction,
            secondaryInteraction,
            interactionHandler,
          )}
        </Form>
      ) : (
        <div className="modal__spinner">
          <Spinner size="inflated" />
        </div>
      )}
    </ReactModal>
  );
};

export default Modal;
