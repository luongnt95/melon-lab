import React, { StatelessComponent } from 'react';

export interface ButtonProps {
  onSubmit?: any;
}

const Form: StatelessComponent<ButtonProps> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {children}
    </form>
  );
};

export default Form;
