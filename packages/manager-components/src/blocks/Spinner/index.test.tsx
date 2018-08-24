import React from 'react';
import Spinner from './index';

describe('Spinner', () => {
  const defaultElement = <Spinner />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
