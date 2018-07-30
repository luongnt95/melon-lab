import { storiesOf } from '@storybook/react';
import React from 'react';
import GetStarted from './index';

const data = {
  linkCaption: 'Setup your fund',
  networkId: '42',
};

storiesOf('Components|Get Started', module).add('Default', () => {
  return <GetStarted {...data} />;
});
