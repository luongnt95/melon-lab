import React from 'react';
import OpenOrders from './index';

const data = {
  isReadyToTrade: true,
  orders: [
    {
      buyHowMuch: '2.1180',
      buySymbol: 'MLN-T',
      id: 12322,
      price: '0.0672',
      sellHowMuch: '0.1423',
      sellSymbol: 'WETH-T',
      timestamp: '25. Jul 2018 11:11',
      type: 'sell',
    },
    {
      buyHowMuch: '2.1180',
      buySymbol: 'MLN-T',
      id: 29468,
      price: '0.0672',
      sellHowMuch: '0.1423',
      sellSymbol: 'WETH-T',
      timestamp: '25. Jul 2018 11:11',
      type: 'sell',
    },
  ],
};

describe('OpenOrders', () => {
  const defaultElement = <OpenOrders {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
