import React from 'react';
import ClaimReward from './index';

const data = {

};

describe('ClaimReward', () => {
  const defaultElement = <ClaimReward {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
