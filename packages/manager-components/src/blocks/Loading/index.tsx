import React, { Fragment } from 'react';

import styles from './styles.css';

const Loading = () => {
  return (
    <Fragment>
      <style jsx>{styles}</style>
      <span className="loading__item">.</span>
      <span className="loading__item">.</span>
      <span className="loading__item">.</span>
    </Fragment>
  );
};

export default Loading;
