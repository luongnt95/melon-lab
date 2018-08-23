import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import * as NumberFormat from 'react-number-format';

import styles from './styles.css';

export interface InputProps {
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value, event) => void;
  onBlur?: () => void;
  label?: string;
  type: string;
  insideLabel?: boolean;
  pattern?: string;
  step?: string;
  formatNumber?: boolean;
  decimals?: number;
  value?: string;
  name: string;
  error?: string;
  hidden?: boolean;
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
  formatNumber,
  name,
  error,
  hidden,
}) => {
  const inputClassNames = classNames('input', {
    'input--inside-label': insideLabel,
    'input--has-error': error,
  });

  const handleChange = (e: any): void => {
    const targetValue = e.target.value;
    if (onChange) {
      onChange({ value: targetValue }, e);
    }
  };

  return (
    <div className={inputClassNames}>
      <style jsx>{styles}</style>
      {label && <span className="input__label">{label}</span>}
      {formatNumber ? (
        <NumberFormat
          hidden={hidden}
          name={name}
          pattern={pattern}
          step={step}
          className="input__field"
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          onBlur={onBlur}
          decimalScale={decimals}
          fixedDecimalScale={true}
          isNumericString={true}
        />
      ) : (
        <input
          hidden={hidden}
          name={name}
          pattern={pattern}
          step={step}
          className="input__field"
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
        />
      )}
      <div className="input__error">{error}</div>
    </div>
  );
};

export default Input;
