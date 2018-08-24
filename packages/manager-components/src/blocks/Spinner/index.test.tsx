import React from 'react';
import Spinner from './index';

const data = {
  icon: true,
};

describe('Spinner', () => {
  const defaultElement = <Spinner {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
