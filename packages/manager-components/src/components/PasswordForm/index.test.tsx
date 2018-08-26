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
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
