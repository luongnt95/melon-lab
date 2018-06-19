import React, { StatelessComponent } from 'react';

import styles from './styles.css';

const FormError: StatelessComponent = ({ children }) => {
  return (
    <div className="form-error">
      <style jsx>{styles}</style>
      {children}
    </div>
  );
};

export default FormError;
