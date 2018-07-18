import React from 'react';
import ParticipationForm from './container';

const initialProps = {
  values: {
    type: 'Invest',
  },
  decimals: 4,
  setup: true,
  dataValid: true,
  quoteAsset: 'WETH-T',
  fund: {
    sharePrice: 5
  }
};

describe('OrderForm', () => {
  const defaultElement = <ParticipationForm {...initialProps} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
