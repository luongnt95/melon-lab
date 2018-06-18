import React from 'react';
import Icons from '~/blocks/Icon';

import '../logos.svg';
import styles from './styles.css';

const Logos = ({ name, width, height }) => (
  <div className="logos">
    <style jsx>{styles}</style>
    <div className="logos__el">
      <span className="logos__name">{name}</span>
      <Icons name={`logos_${name}`} height={height} width={width} />
    </div>
  </div>
);

const LogoDefault = () => <Logos name="default" />;
const LogoWithText = () => <Logos name="with-text" />;

export { LogoDefault, LogoWithText };
