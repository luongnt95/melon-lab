import React from 'react';
import GetStarted from './index';

const data = {};

describe('GetStarted', () => {
  const defaultElement = <GetStarted {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
