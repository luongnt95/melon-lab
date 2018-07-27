import React, { Fragment } from 'react';

import styles from './styles.css';

const Loading = ({ children, loading = true, dataAvailable = true }) => {
  return (
    <span>
      <style jsx>{styles}</style>
      {loading ? (
        <Fragment>
          <span className="loading__item">.</span>
          <span className="loading__item">.</span>
          <span className="loading__item">.</span>
        </Fragment>
      ) : (
        <Fragment>
          {dataAvailable ? (
            <Fragment>{children}</Fragment>
          ) : (
            <span className="loading__invalid">{children}</span>
          )}
        </Fragment>
      )}
    </span>
  );
};

export default Loading;
