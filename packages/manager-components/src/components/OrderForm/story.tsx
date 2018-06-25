import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderForm from './index';

const initialProps = {
  baseTokenSymbol: 'ETH-T-M',
  quoteTokenSymbol: 'MLN-T-M',
  strategy: 'Limit',
  selectedOrder: false,
  info: {
    lastPrice: 0.5,
    bid: 0,
    ask: 0,
    tokens: {
      baseToken: {
        name: 'ETH-T',
        balance: 30.0,
      },
      quoteToken: {
        name: 'MLN-T',
        balance: 20.0,
      },
    },
  },
  exchanges: [
    { value: 'RadarRelay', name: 'Radar Relay' },
    { value: 'OasisDEX', name: 'OasisDEX' },
  ],
  selectedExchange: 'RadarRelay',
  selectedOrderType: 'Buy',
  decimals: 4,
};

storiesOf('Components|Order Form', module).add('Default', () => {
  return <OrderForm {...initialProps} />;
});
