import React from 'react';

import styles from './styles.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <style jsx>{styles}</style>
      {children}
    </div>
  );
};

export default Layout;
