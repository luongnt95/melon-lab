import React from 'react';
import PasswordForm from './container';

const initialProps = {
  initialValues: {
    password: '',
  },
};

describe('PasswordForm', () => {
  const defaultElement = <PasswordForm {...initialProps} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
