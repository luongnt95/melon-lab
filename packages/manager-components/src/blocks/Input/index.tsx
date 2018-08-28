import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import NumberFormat from 'react-number-format';

import styles from './styles.css';

export interface InputProps {
  decimals?: number;
  disabled?: boolean;
  error?: string;
  formatNumber?: boolean;
  hidden?: boolean;
  insideLabel?: boolean;
  label?: string;
  name: string;
  onBlur?: () => void;
  onChange?: (e) => void;
  pattern?: string;
  placeholder?: string;
  step?: string;
  type?: string;
  value?: string;
}

const Input: StatelessComponent<InputProps> = ({
  decimals = 4,
  disabled,
  error,
  formatNumber,
  hidden,
  insideLabel,
  label,
  name,
  onBlur,
  onChange,
  pattern,
  placeholder,
  step,
  type = 'text',
  value,
}) => {
  const inputClassNames = classNames('input', {
    'input--inside-label': insideLabel,
    'input--has-error': error,
  });

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
          onChange={onChange}
          onBlur={onBlur}
          decimalScale={decimals}
          fixedDecimalScale={true}
          isNumericString={true}
          type="text"
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
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      <div className="input__error">{error}</div>
    </div>
  );
};

export default Input;
