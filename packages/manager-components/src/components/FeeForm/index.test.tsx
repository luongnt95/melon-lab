import React from 'react';
import FeeForm from './container';

const initialProps = {
  initialValues: {
    gasPrice: '20.000',
  },
};

describe('FeeForm', () => {
  const defaultElement = <FeeForm {...initialProps} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
