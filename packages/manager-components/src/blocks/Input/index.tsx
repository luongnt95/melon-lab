import classNames from 'classnames';
import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface InputProps {
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<Element>;
  label: string;
  type: string;
  insideLabel?: boolean;
  pattern?: string;
  step?: string;
  cleanNumber?: boolean;
  decimals?: number;
  value?: string;
  name: string;
}

const Input: StatelessComponent<InputProps> = ({
  disabled,
  placeholder,
  onChange,
  label,
  type = 'text',
  insideLabel,
  step,
  pattern,
  decimals = 4,
  value,
  cleanNumber,
  name,
}) => {
  const classname = classNames('input', {
    'input--inside-label': insideLabel,
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
      />
    </div>
  );
};

export default Input;
