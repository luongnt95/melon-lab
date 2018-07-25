import React from 'react';

import styles from './styles.css';

const Loading = () => {
  return (
    <span className="loading">
      <style jsx>{styles}</style>
      <span className="loading__item">.</span>
      <span className="loading__item">.</span>
      <span className="loading__item">.</span>
    </span>
  );
};

export default Loading;
