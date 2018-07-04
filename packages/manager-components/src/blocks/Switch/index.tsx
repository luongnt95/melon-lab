import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface SwitchProps {
  options: Array<[string]>;
  labels: Array<[string]>;
  name: string;
  isChecked?: boolean;
  disabled?: boolean;
  onChange(value, event);
}

const Switch: StatelessComponent<SwitchProps> = ({
  options,
  labels,
  onChange,
  name,
  isChecked,
  disabled,
}) => {
  const handleChange = e => {
    const checked = e.target.checked;
    const value = !checked ? labels[0] : labels[1];
    e.target.value = value;
    if (onChange) {
      onChange({ value }, e);
    }
  };

  return (
    <div className="switch">
      <style jsx>{styles}</style>
      <label className="switch__wrapper">
        <input
          name={name}
          onChange={handleChange}
          className="switch__input"
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
        />
        <span
          data-label-left={labels[0]}
          data-label-right={labels[1]}
          className="switch__label"
        >
          {options[0]}
        </span>
        <span
          data-label-left={labels[0]}
          data-label-right={labels[1]}
          className="switch__label"
        >
          {options[1]}
        </span>
        <div className="switch__icon" />
      </label>
    </div>
  );
};

export default Switch;
