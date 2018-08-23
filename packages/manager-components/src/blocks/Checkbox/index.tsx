import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface CheckboxProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  name: string;
  onInputChange?: () => void;
  text: string;
  value: string;
}

const Checkbox: StatelessComponent<CheckboxProps> = ({
  defaultChecked,
  disabled,
  name,
  onInputChange,
  text,
  value,
}) => (
  <label className="checkbox">
    <style jsx>{styles}</style>
    <input
      className="checkbox__input"
      type="checkbox"
      name={name}
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onInputChange}
    />
    <span className="checkbox__checkmark" />
    <span className="checkbox__text">{text}</span>
  </label>
);

export default Checkbox;
