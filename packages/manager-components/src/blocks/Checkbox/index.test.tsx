import React from 'react';
import Checkbox from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'Text',
};

describe('Checkbox', () => {
  const defaultElement = <Checkbox {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
