import React from 'react';
import Modal from './index';

const data = {
  isOpen: true,
  loading: true,
  title: 'Modal',
};

describe('Modal', () => {
  const defaultElement = <Modal {...data}>Hello World</Modal>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
