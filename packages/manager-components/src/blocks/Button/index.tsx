import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  disabled?: boolean;
  type?: string;
  onClick: (e, value) => void;
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
  const buttonClassNames = classNames('button', {
    [`button--${size}`]: size,
    [`button--${style}`]: style,
  });

  const onButtonClick = (e: any): void => {
    onClick(e, buttonValue);
  };

  return (
    <button
      type={type}
      onClick={onButtonClick}
      className={buttonClassNames}
      disabled={disabled}
    >
      <style jsx>{styles}</style>
      {children}
    </button>
  );
};

export default Button;
