import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface DropdownProps {
  options: Array<{
    value: string;
    name: string;
  }>;
  onChange?: ChangeEventHandler<Element>;
  selectedItem?: string;
  label?: string;
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
  selectedItem,
  onChange,
  label,
}) => {
  const ops =
    options && options.map((item, index) => renderOption(item, index));

  return (
    <div className="dropdown">
      <style jsx>{styles}</style>
      {label &&
        <span className="dropdown__label">{label}</span>
      }
      <div className="dropdown__wrapper">
        <select
          defaultValue={selectedItem ? selectedItem : '0'}
          className="dropdown__select"
          onChange={onChange}
        >
          {selectedItem === '0' && (
            <option value="0" disabled hidden>
              Choose here
            </option>
          )}
          {ops}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
