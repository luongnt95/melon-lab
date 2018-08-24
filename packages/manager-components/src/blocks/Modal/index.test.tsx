import React from 'react';
import Modal from './index';

const mockCallback = jest.fn();
const data = {
  isOpen: true,
  loading: false,
  title: 'Modal',
  primaryInteraction: 'primaryInteraction',
  secondaryInteraction: 'secondaryInteraction',
  interactionHandler: mockCallback,
};

describe('Modal', () => {
  const defaultElement = <Modal {...data}>Hello World</Modal>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick secondary action', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('Button')
      .at(0)
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][1]).toBe(data.secondaryInteraction);
  });

  it('onClick primary action', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][1]).toBe(data.primaryInteraction);
  });
});
