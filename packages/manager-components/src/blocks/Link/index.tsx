import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface LinkProps {
  size?: string;
  style?: string;
  url: string;
  target?: string;
}

const Link: StatelessComponent<LinkProps> = ({
  children,
  size,
  style,
  url,
  target = '_self',
}) => {
  const linkClassNames = classNames('link', {
    [`link--${size}`]: size,
    [`link--${style}`]: style,
  });

  return (
    <a href={url} target={target} className={linkClassNames}>
      <style jsx>{styles}</style>
      {children}
    </a>
  );
};

export default Link;
