import React from 'react';
import InsufficientFunds from './index';

const data = {};

describe('InsufficientFunds', () => {
  const defaultElement = <InsufficientFunds {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
