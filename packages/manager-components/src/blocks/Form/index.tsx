import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  onSubmit?: any;
}

const Form: StatelessComponent<ButtonProps> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <style jsx>{styles}</style>
      {children}
    </form>
  );
};

export default Form;
