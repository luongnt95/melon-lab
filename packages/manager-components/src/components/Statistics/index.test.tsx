import React from 'react';
import Statistics from './index';

const data = {
  rewardsSum: '0',
  investmentsSum: '0',
  redeemalsSum: '0',
  tradesCount: '0',
  highestSharePrice: '0',
  netAssetValue: '0',
};

describe('Statistics', () => {
  const defaultElement = <Statistics {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
