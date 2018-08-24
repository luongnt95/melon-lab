import React from 'react';
import Switch from './index';

const mockCallback = jest.fn();
const data = {
  options: ['ETH-T-M', 'MLN-T-M'],
  labels: ['Buy', 'Sell'],
  name: 'name',
  value: 'value',
  onChange: mockCallback,
};

describe('Switch', () => {
  const defaultElement = <Switch {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange event', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('.switch__input')
      .simulate('change', { target: { checked: true } });
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].value).toBe(data.labels[1]);
    wrapper
      .find('.switch__input')
      .simulate('change', { target: { checked: false } });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][0].value).toBe(data.labels[0]);
  });
});
