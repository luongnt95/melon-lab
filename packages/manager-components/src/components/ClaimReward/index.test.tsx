import React from 'react';
import ClaimReward from './index';

const data = {
  competitionName: 'Naxos',
  claimReward: () => null,
  isCompetitionActive: false,
  endTime: 'Tomorrow',
  redeemParosShares: () => null,
};

describe('ClaimReward', () => {
  const defaultElement = <ClaimReward {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
