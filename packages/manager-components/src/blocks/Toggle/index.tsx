import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ToggleProps {
  disabled?: boolean;
  name: string;
  value: string;
  text: string;
  isChecked?: boolean;
  onChange?: (value, event) => void;
}

const Toggle: StatelessComponent<ToggleProps> = ({
  disabled,
  name,
  value,
  text,
  isChecked,
  onChange,
}) => {
  const handleChange = (e: any): void => {
    const targetValue = e.target.value;
    onChange({ value: targetValue }, e);
  };

  return (
    <label className="toggle">
      <style jsx>{styles}</style>
      <input
        className="toggle__input"
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        hidden
      />
      <span className="toggle__text">{text}</span>
    </label>
  );
};

export default Toggle;
