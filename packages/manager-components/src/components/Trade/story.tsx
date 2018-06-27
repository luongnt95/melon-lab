import { storiesOf } from '@storybook/react';
import React from 'react';
import Trade from './container';

const initialProps = {
  form: {
    baseTokenSymbol: 'ETH-T-M',
    quoteTokenSymbol: 'MLN-T-M',
    selectedOrder: 20.0000,
    info: {
      lastPrice: 0.5000,
      bid: 0,
      ask: 0,
      tokens: {
        baseToken: {
          name: 'ETH-T',
          balance: 30.0000,
        },
        quoteToken: {
          name: 'MLN-T',
          balance: 20.0000,
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
    dataValid: true,
  },
};

storiesOf('Components|Trade', module).add('Default', () => {
  return <Trade {...initialProps} />;
});
