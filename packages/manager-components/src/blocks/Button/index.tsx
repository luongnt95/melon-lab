import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  disabled?: boolean;
  type?: string;
  onClick?: any;
  size?: string;
  style?: string;
  buttonValue?: any;
}

const Button: StatelessComponent<ButtonProps> = ({
  children,
  disabled,
  onClick,
  type = 'button',
  size = 'medium',
  style = 'primary',
  buttonValue,
}) => {
  const sizeClass = `button--${size}`;
  const styleClass = `button--${style}`;
  const classes = `button ${sizeClass} ${styleClass}`;

  const onButtonClick = (e) => {
    onClick(e, buttonValue);
  };

  return (
    <button
      type={type}
      onClick={onButtonClick}
      className={classes}
      disabled={disabled}
    >
      <style jsx>{styles}</style>
      {children}
    </button>
  );
};

export default Button;
