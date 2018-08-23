import React from 'react';
import Toggle from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'text',
};

describe('Toggle', () => {
  const defaultElement = <Toggle {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
