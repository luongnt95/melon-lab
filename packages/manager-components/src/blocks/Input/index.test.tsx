import React from 'react';
import Input from './index';

const data = {
  name: 'input',
  type: 'text',
};

describe('Input', () => {
  const defaultElement = <Input {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
