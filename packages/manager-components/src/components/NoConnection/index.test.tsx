import React from 'react';
import NoConnection from './index';

describe('NoConnection', () => {
  const defaultElement = <NoConnection />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
