import React from 'react';
import Factsheet from './index';

const data = {
  aum: '0.9824',
  creationDate: '24. Jul 2018 09:19',
  dataValid: false,
  expectedPrize: '0.54321',
  isCompetition: false,
  loading: false,
  managementReward: '0.0000',
  name: 'Melon Fund',
  numberOfFunds: '12',
  performanceReward: '0.0000',
  personalStake: '1.0000',
  quoteAsset: 'WETH-T',
  rank: '1',
  sharePrice: '0.9824',
  shutdown: () => null,
  totalSupply: '1.0000',
  tweetHref: 'melonport',
};

describe('Factsheet', () => {
  const defaultElement = <Factsheet {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
