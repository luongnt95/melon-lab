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
      lastPrice: 0,
      bid: 0,
      ask: 0,
      balances: [
        {
          name: 'ETH-T',
          value: 0,
        },
        {
          name: 'MLN-T',
          value: 0,
        },
      ],
    },
    exchanges: [
      { value: 'RadarRelay', name: 'Radar Relay' },
      { value: 'OasisDEX', name: 'OasisDEX' },
    ],
    selectedExchange: 'RadarRelay',
    selectedOrderType: 'Buy',
    decimals: 6,
  }
};

storiesOf('Components|Trade', module).add('Default', () => {
  return <Trade {...initialProps} />;
});
