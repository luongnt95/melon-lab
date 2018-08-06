import React from 'react';
import Input from './index';

describe('Input', () => {
  const defaultElement = <Input />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
