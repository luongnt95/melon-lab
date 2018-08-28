import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  buttonValue?: any;
  disabled?: boolean;
  onClick?: (e, value) => void;
  size?: string;
  style?: string;
  type?: string;
}

const Button: StatelessComponent<ButtonProps> = ({
  buttonValue,
  children,
  disabled,
  onClick,
  size = 'medium',
  style = 'primary',
  type = 'button',
}) => {
  const buttonClassNames = classNames('button', {
    [`button--${size}`]: size,
    [`button--${style}`]: style,
  });

  const onButtonClick = (e: any): void => onClick && onClick(e, buttonValue);

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
