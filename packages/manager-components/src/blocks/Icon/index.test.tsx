import React from 'react';
import Icon from './index';

const data = {
  name: 'logos_default',
};

describe('Icon', () => {
  const defaultElement = <Icon {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
