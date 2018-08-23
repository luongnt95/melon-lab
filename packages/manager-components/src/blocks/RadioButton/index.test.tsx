import React from 'react';
import RadioButton from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'Text',
};

describe('RadioButton', () => {
  const defaultElement = <RadioButton {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
