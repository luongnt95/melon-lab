import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderForm from './container';

const initialProps = {
  baseTokenSymbol: 'ETH-T-M',
  quoteTokenSymbol: 'MLN-T-M',
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
    { value: 'RADAR_RELAY', name: 'Radar Relay' },
    { value: 'OASIS_DEX', name: 'OasisDEX' },
  ],
  selectedExchange: 'RadarRelay',
  selectedOrderType: 'Buy',
  decimals: 4,
  dataValid: true,
};

storiesOf('Components|Order Form', module).add('Default', () => {
  return <OrderForm {...initialProps} />;
});
