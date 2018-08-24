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

  it('should render correctly without showedRegistration', () => {
    const defaultElement = (
      <CompetitionRegistration {...data} showedRegistration={false} />
    );
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick pursue registration event', () => {
    global.open = jest.fn();
    const defaultElement = (
      <CompetitionRegistration {...data} competitionSignature={true} />
    );
    const wrapper = shallow(defaultElement);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(global.open).toBeCalled();
  });
});
