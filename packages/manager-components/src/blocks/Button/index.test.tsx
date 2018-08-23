import React from 'react';
import Button from './index';

const data = {
  onClick: () => null,
};

describe('Button', () => {
  const defaultElement = <Button {...data}>Default button</Button>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
