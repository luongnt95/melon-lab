import React from 'react';
import Card from './index';

describe('Card', () => {
  const defaultElement = <Card />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
