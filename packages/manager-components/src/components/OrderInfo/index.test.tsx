import React from 'react';
import OrderInfo from './index';

const data = {
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
};

describe('Order Info', () => {
  const defaultElement = <OrderInfo {...data} />;
  let customElement;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with lastPrice', () => {
    customElement = <OrderInfo {...data} lastPrice={0.5} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with bid', () => {
    customElement = <OrderInfo {...data} bid={0.5} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with ask', () => {
    customElement = <OrderInfo {...data} ask={0.5} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });
});
