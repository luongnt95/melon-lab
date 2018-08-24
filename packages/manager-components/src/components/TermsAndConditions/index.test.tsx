import React from 'react';
import TermsAndConditions from './index';

const data = {
  networkId: '1',
  sign: () => null,
};

describe('TermsAndConditions', () => {
  const defaultElement = <TermsAndConditions {...data} />;

  it('should render correctly without networkId', () => {
    const defaultElement = <TermsAndConditions {...data} networkId="" />;
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
