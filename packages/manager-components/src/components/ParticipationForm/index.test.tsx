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
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
