import { storiesOf } from '@storybook/react';
import React from 'react';
import Switch from './index';

const options = ['ETH-T', 'MLN-T'];

const labels = ['Buy', 'Sell'];

storiesOf('Blocks|Switch', module).add('Default', () => {
  return <Switch options={options} labels={labels} />;
});
