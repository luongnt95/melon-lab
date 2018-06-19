import { storiesOf } from '@storybook/react';
import React from 'react';
import Trade from './index';

const initialProps = {
  form: {
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
          balance: 30,
        },
        quoteToken: {
          name: 'MLN-T',
          balance: 20,
        },
      },
    },
    exchanges: [
      { value: 'RadarRelay', name: 'Radar Relay' },
      { value: 'OasisDEX', name: 'OasisDEX' },
    ],
    selectedExchange: 'RadarRelay',
    selectedOrderType: 'Buy',
    decimals: 6,
  },
};

storiesOf('Components|Trade', module).add('Default', () => {
  return <Trade {...initialProps} />;
});
