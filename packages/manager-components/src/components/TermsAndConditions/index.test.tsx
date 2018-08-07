import React from 'react';
import TermsAndConditions from './index';

const data = {
};

describe('TermsAndConditions', () => {
  const defaultElement = <TermsAndConditions {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
