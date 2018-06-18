import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface SwitchProps {
  options: Array<[string]>;
  onChange?: ChangeEventHandler<Element>;
  labels: Array<[string]>;
}

const Switch: StatelessComponent<SwitchProps> = ({ options, labels, onChange }) => {
  return (
    <div className="switch">
      <style jsx>{styles}</style>
      <label className="switch__wrapper">
        <input onChange={onChange} className="switch__input" type="checkbox" />
        <span data-label-left={labels[0]} data-label-right={labels[1]} className="switch__label">{options[0]}</span>
        <span data-label-left={labels[0]} data-label-right={labels[1]} className="switch__label">{options[1]}</span>
        <div className="switch__icon" />
      </label>
    </div>
  );
};

export default Switch;
