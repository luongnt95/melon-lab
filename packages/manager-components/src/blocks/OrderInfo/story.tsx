import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderInfo from './index';

const data = {
  lastPrice: 8.125,
  bid: 8.125,
  ask: 8.125,
  balances: [
    {
      name: 'ETH-T',
      value: 8.125,
    },
    {
      name: 'MLN-T',
      value: 8.125,
    },
  ],
};

storiesOf('Blocks|OrderInfo', module).add('Default', () => {
  return <OrderInfo {...data} />;
});
