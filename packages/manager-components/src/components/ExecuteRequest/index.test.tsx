import React from 'react';
import ExecuteRequest from './index';

const data = {};

describe('ExecuteRequest', () => {
  const defaultElement = <ExecuteRequest {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
