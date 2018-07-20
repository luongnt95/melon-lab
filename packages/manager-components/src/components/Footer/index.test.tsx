import React from 'react';
import Footer from './index';

describe('Footer', () => {
  const defaultElement = <Footer />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
