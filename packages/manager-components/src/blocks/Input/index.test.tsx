import React from 'react';
import Input from './index';

const mockCallback = jest.fn();
const data = {
  name: 'input',
  type: 'text',
  label: 'label',
};

describe('Input', () => {
  const defaultElement = <Input {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with number', () => {
    const defaultElementNumber = <Input {...data} formatNumber />;
    const wrapper = shallow(defaultElementNumber);
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange event', () => {
    const defaultElement = <Input {...data} onChange={mockCallback} />;
    const wrapper = shallow(defaultElement);
    wrapper
      .find('.input__field')
      .simulate('change', { target: { value: 'test' } });
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].value).toBe('test');
  });

  it('onChange event', () => {
    const defaultElement = <Input {...data} onChange={undefined} />;
    const wrapper = shallow(defaultElement);
    wrapper
      .find('.input__field')
      .simulate('change', { target: { value: 'test' } });
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
