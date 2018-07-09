import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface SwitchProps {
  options: Array<[string]>;
  labels: Array<[string]>;
  name: string;
  isChecked?: boolean;
  disabled?: boolean;
  value: string;
  onChange(value, event);
}

const Switch: StatelessComponent<SwitchProps> = ({
  options,
  labels,
  onChange,
  name,
  isChecked,
  disabled,
  value,
}) => {
  const handleChange = e => {
    const checked = e.target.checked;
    const checkedValue = !checked ? labels[0] : labels[1];
    if (onChange) {
      onChange({ value: checkedValue }, e);
    }
  };

  return (
    <div className="switch">
      <style jsx>{styles}</style>
      <label className="switch__wrapper">
        <input
          name={name}
          value={value}
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
