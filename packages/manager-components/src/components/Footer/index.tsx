import React, { StatelessComponent } from 'react';

import styles from './styles.css';

const Footer: StatelessComponent = () => {
  return (
    <div className="footer">
      <style jsx>{styles}</style>
      <span className="footer__item">Hosted with ❤ on IPFS</span>
      <span className="footer__item">
        <a
          className="footer__item-link"
          href="https://github.com/melonproject/melon-lab/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Report an issue
        </a>
      </span>
      <span className="footer__item">
        <a
          className="footer__item-link"
          href="https://www.melonport.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Melonport
        </a>
      </span>
    </div>
  );
};

export default Footer;
