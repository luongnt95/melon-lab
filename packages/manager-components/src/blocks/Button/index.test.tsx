import React from 'react';
import Button from './index';

const mockCallback = jest.fn();
const data = {
  onClick: mockCallback,
};

describe('Button', () => {
  const defaultElement = <Button {...data}>Default button</Button>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick event', () => {
    const wrapper = shallow(defaultElement);
    wrapper.find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
