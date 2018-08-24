import React from 'react';
import Switch from './index';

const data = {
  options: ['ETH-T-M', 'MLN-T-M'],
  labels: ['Buy', 'Sell'],
  name: 'name',
  value: 'value',
  onChange: () => null,
};

describe('Switch', () => {
  const defaultElement = <Switch {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
