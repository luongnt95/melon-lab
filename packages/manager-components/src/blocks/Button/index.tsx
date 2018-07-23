import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  disabled?: boolean;
  type?: string;
  onClick?: ChangeEventHandler<Element>;
  size?: string;
  style?: string;
}

const Button: StatelessComponent<ButtonProps> = ({
  children,
  disabled,
  onClick,
  type = 'button',
  size = 'default',
  style = 'default',
}) => {
  const sizeClass = `button--${size}`;
  const styleClass = `button--${style}`;
  const classes = `button ${sizeClass} ${styleClass}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      <style jsx>{styles}</style>
      {children}
    </button>
  );
};

export default Button;
