import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

const Spinner: StatelessComponent = () => {
  return (
    <div className="spinner">
      <style jsx>{styles}</style>
      <Icon width="100px" height="100px" name="logos_without-border" />
      <div className="spinner__loader">
      </div>

    </div>
  )
};

export default Spinner;
