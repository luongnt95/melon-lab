import React from 'react';
import Administration from './index';

const data = {};

describe('Administration', () => {
  const defaultElement = <Administration {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
