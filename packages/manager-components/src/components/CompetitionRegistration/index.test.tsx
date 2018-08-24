import React from 'react';
import CompetitionRegistration from './index';

const data = {
  skipRegistration: () => null,
  continueToSignCompetitionTerms: () => null,
  sign: () => null,
  isRegistered: () => null,
  fundAddress: 'foo',
  managerAddress: 'foo',
  showedRegistration: true,
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
