import React from 'react';
import CompetitionRegistration from './index';

const data = {
  fundAddress: 'foo',
  managerAddress: 'foo',
  showedRegistration: true,
  skipRegistration: () => true,
  continueToSignCompetitionTerms: false,
  sign: () => true,
  isRegistered: false,
  competitionSignature: false,
  r: 'foo',
  s: 'foo',
  v: 'foo',
};

describe('CompetitionRegistration', () => {
  const defaultElement = <CompetitionRegistration {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
