import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  disabled?: boolean;
  type?: string;
  onClick?: ChangeEventHandler<Element>;
}

const Button: StatelessComponent<ButtonProps> = ({
  children,
  disabled,
  onClick,
  type = 'button',
}) => {
  return (
    <button type={type} onClick={onClick} className="button" disabled={disabled}>
      <style jsx>{styles}</style>
      {children}
    </button>
  )
};

export default Button;
