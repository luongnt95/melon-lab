import React from 'react';
import PasswordForm from './container';

const data = {
  initialValues: {
    password: '',
  },
  onCancel: () => null,
  onSubmit: () => null,
};

describe('PasswordForm', () => {
  const defaultElement = <PasswordForm {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
