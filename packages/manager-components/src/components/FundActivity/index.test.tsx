import React from 'react';
import FundActivity from './index';

const data = {
  requestFullParticipationHistory: () => null,
};

describe('FundActivity', () => {
  const defaultElement = <FundActivity {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
