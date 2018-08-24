import React from 'react';
import ClaimReward from './index';

const mockCallbackClaimReward = jest.fn();
const mockCallbackRedeemParosShares = jest.fn();
const data = {
  competitionName: 'Naxos',
  claimReward: mockCallbackClaimReward,
  isCompetitionActive: false,
  endTime: 'Tomorrow',
  redeemParosShares: mockCallbackRedeemParosShares,
};

describe('ClaimReward', () => {
  const defaultElement = <ClaimReward {...data} />;
  let customElement;

  it('should render correctly with isCompetitionActive', () => {
    customElement = <ClaimReward {...data} isCompetitionActive={true} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick claimReward event', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockCallbackClaimReward.mock.calls.length).toBe(1);
  });

  it('onClick redeemParosShares event', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(mockCallbackRedeemParosShares.mock.calls.length).toBe(1);
  });
});
