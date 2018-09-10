import { storiesOf } from '@storybook/react';
import React from 'react';
import Link from './index';

const data = {
  url: 'https://melonport.com',
  target: '_blank',
};

storiesOf('Blocks|Link', module)
  .add('Default', () => {
    return <Link {...data}>Default link</Link>;
  })
  .add('Button style', () => {
    return (
      <Link {...data} style="button" size="medium">
        Default link
      </Link>
    );
  });
