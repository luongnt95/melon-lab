import React from 'react';
import Toggle from './index';

const mockCallback = jest.fn();
const data = {
  name: 'name',
  value: 'value',
  text: 'text',
  onChange: mockCallback,
};

describe('Toggle', () => {
  const defaultElement = <Toggle {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange event', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('.toggle__input')
      .simulate('change', { target: { checked: true, value: data.value } });
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].value).toBe(data.value);
    wrapper
      .find('.toggle__input')
      .simulate('change', { target: { checked: true, value: data.value } });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][0].value).toBe(data.value);
  });
});
