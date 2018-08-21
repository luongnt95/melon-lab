import React from 'react';
import Factsheet from './index';

const data = {
  aum: '0.9824',
  creationDate: '24. Jul 2018 09:19',
  managementReward: '0.0000',
  name: 'Melon Fund',
  performanceReward: '0.0000',
  personalStake: '1.0000',
  sharePrice: '0.9824',
  totalSupply: '1.0000',
  rank: '...',
  numberOfFunds: '...',
  tweetHref: '...',
  loading: false,
  dataValid: false,
  expectedPrize: '...',
  quoteAsset: 'WETH-T',
  isCompetition: false,
};

describe('Factsheet', () => {
  const defaultElement = <Factsheet {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
