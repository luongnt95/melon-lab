import React from 'react';
import OrderInfo from './index';

describe('OrderInfo', () => {
  const data = {
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
  };
  const defaultElement = <OrderInfo {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "order-info"', () => {
    expect(shallow(defaultElement).is('.order-info')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.order-info').length).toBe(1);
  });

  xit('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default order info');
  });
});
