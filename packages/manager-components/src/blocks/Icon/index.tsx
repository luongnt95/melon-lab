import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

export interface IconProps {
  name: string;
  iconClass?: string;
  height?: string;
  width?: string;
}

const Icon: StatelessComponent<IconProps> = ({
  name,
  height,
  width,
  iconClass,
}) => {
  const iconClassNames = classNames('icon', {
    [`${iconClass}`]: iconClass,
  });

  return (
    <svg
      className={iconClassNames}
      height={height ? height : '100%'}
      width={width ? width : '100%'}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
