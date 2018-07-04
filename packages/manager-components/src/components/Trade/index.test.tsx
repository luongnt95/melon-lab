import React from 'react';
import Trade from './container';

describe('Trade', () => {
  const defaultElement = <Trade />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
