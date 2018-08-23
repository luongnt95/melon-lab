import React from 'react';
import Setup from './container';

const data = {
  initialValues: {
    name: '',
  },
  config: {
    canonicalPriceFeedAddress: 'foo',
    competitionComplianceAddress: 'bar',
    onlyManagerCompetitionAddress: 'foo',
  },
  onSubmit: () => null,
};

describe('Setup', () => {
  const defaultElement = <Setup {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
