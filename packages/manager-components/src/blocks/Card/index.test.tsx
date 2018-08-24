import React from 'react';
import Card from './index';

const mockCallback = jest.fn();
const data = {
  name: 'Black Turtle',
  address: '0x5bBA9263Ab1eA26FF9c0FeE3619e7AAf7C79E02b',
  inception: '26. Jul 2018 10:48',
  sharePrice: '1.0081',
  rank: 1,
  onClick: mockCallback,
};

describe('Card', () => {
  const defaultElement = <Card {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick event', () => {
    const wrapper = shallow(defaultElement);
    wrapper.find('.card').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
