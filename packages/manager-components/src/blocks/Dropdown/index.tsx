import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface DropdownProps {
  options: Array<{
    value: string;
    name: string;
  }>;
  label: string;
  value?: string;
  name: string;
  onChange(value, event);
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
}) => {
  const ops =
    options && options.map((item, index) => renderOption(item, index));

  const handleChange = e => {
    onChange({ ...e.target.value }, e);
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
        >
          {ops}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
