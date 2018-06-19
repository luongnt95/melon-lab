import classNames from 'classnames';
import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface InputProps {
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<Element>;
  onBlur?: ChangeEventHandler<Element>;
  label: string;
  type: string;
  insideLabel?: boolean;
  pattern?: string;
  step?: string;
  cleanNumber?: boolean;
  decimals?: number;
  value?: string;
  name: string;
  error: string;
}

const Input: StatelessComponent<InputProps> = ({
  disabled,
  placeholder,
  onChange,
  onBlur,
  label,
  type = 'text',
  insideLabel,
  step,
  pattern,
  decimals = 4,
  value,
  cleanNumber,
  name,
  error,
}) => {
  const classname = classNames('input', {
    'input--inside-label': insideLabel,
    'input--has-error': error,
  });

  return (
    <div className={classname}>
      <style jsx>{styles}</style>
      <span className="input__label">{label}</span>
      <input
        name={name}
        pattern={pattern}
        step={step}
        className="input__field"
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="input__error">{error}</div>
    </div>
  );
};

export default Input;
