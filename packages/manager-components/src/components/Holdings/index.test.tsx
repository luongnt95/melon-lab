import React from 'react';
import Holdings from './index';

const data = {

};

describe('RecentTrades', () => {
  const defaultElement = <Holdings {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
