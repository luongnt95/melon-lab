import React from 'react';
import Notification from './index';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`;

const data = {
  isClosable: true,
};

describe('Notification', () => {
  const defaultElement = <Notification {...data}>{text}</Notification>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
