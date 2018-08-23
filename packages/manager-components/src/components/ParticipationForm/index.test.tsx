import React from 'react';
import ParticipationForm from './container';

const data = {
  values: {
    type: 'Invest',
  },
  decimals: 4,
  setup: true,
  dataValid: true,
  quoteAsset: 'WETH-T',
  fund: {
    sharePrice: 5,
  },
};

describe('ParticipationForm', () => {
  const defaultElement = <ParticipationForm {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
