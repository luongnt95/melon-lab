import React from 'react';
import Modal from './index';

describe('Modal', () => {
  const defaultElement = (
    <Modal isOpen title="Hello World">
      Hello World
    </Modal>
  );

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
