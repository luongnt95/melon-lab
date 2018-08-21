import React from 'react';
import Toggle from './index';

describe('Toggle', () => {
  const defaultElement = <Toggle name="strategy" value="Limit" text="Limit" />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
