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
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
