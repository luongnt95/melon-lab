import React from 'react';
import FeeForm from './container';

const data = {
  initialValues: {
    gasPrice: '20.000',
  },
  onSubmit: () => null,
  onCancel: () => null,
};

describe('FeeForm', () => {
  const defaultElement = <FeeForm {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
