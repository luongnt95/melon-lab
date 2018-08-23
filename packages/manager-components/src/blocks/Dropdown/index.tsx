import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface DropdownProps {
  options: Array<{
    value: string;
    name: string;
  }>;
  label: string;
  value?: string;
  name: string;
  disabled: boolean;
  onChange: (value, event) => void;
}

const renderOption = (option, index) => {
  return (
    <option key={index} value={option.value}>
      {option.name}
    </option>
  );
};

const Dropdown: StatelessComponent<DropdownProps> = ({
  options,
  onChange,
  label,
  value,
  name,
  disabled,
}) => {
  const ops =
    options && options.map((item, index) => renderOption(item, index));

  const handleChange = (e: any): void => {
    const targetValue: any = e.target.value;
    onChange({ value: targetValue }, e);
  };

  return (
    <div className="dropdown">
      <style jsx>{styles}</style>
      {label && <span className="dropdown__label">{label}</span>}
      <div className="dropdown__wrapper">
        <select
          name={name}
          className="dropdown__select"
          onChange={handleChange}
          value={value}
          disabled={disabled}
        >
          {ops}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
