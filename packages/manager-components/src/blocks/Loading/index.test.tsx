import React from 'react';
import Loading from './index';

describe('Loading', () => {
  const defaultElement = <Loading />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
