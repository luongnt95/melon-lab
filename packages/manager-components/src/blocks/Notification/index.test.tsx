import React from 'react';
import Notification from './index';

describe('Notification', () => {
  const defaultElement = <Notification />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
