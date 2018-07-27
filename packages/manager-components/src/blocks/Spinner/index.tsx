import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface SpinnerProps {
  size?: string;
}

const Spinner: StatelessComponent<SpinnerProps> = ({
  size = 'default',
}) => {
  const sizeClass = `spinner--${size}`;
  const classes = `spinner ${sizeClass}`;

  return (
    <div className={classes}>
      <style jsx>{styles}</style>
      <Icon iconClass="spinner__icon" name="logos_without-border" />
      <div className="spinner__loader" />
    </div>
  );
};

export default Spinner;
