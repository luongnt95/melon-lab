import React from 'react';
import WrongNetwork from './index';

describe('WrongNetwork', () => {
  const defaultElement = <WrongNetwork />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
