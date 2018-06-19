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
};

describe('OrderForm', () => {
  const defaultElement = <OrderForm {...initialProps}>Default text</OrderForm>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  xit('should be selectable by class "order-form"', () => {
    expect(shallow(defaultElement).is('.order-form')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.order-form').length).toBe(1);
  });

  xit('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default text');
  });
});
