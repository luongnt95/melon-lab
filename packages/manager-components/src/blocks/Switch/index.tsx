import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface SwitchProps {
  options: Array<[string]>;
  labels: Array<[string]>;
  name: string;
  onChange(value, event);
}

const Switch: StatelessComponent<SwitchProps> = ({
  options,
  labels,
  onChange,
  name,
}) => {
  const handleChange = e => {
    const checked = e.target.checked;
    const value = !checked ? labels[0] : labels[1];
    e.target.value = value;
    onChange({ value }, e);
  };

  return (
    <div className="switch">
      <style jsx>{styles}</style>
      <label className="switch__wrapper">
        <input
          name={name}
          onChange={e => handleChange(e)}
          className="switch__input"
          type="checkbox"
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
