import React from 'react';
import Form from './index';

describe('Form', () => {
  const defaultElement = <Form>Default form</Form>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
