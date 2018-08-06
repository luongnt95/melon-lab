import React from 'react';
import RestoreWallet from './index';

const data = {
  initialValues: {
    mnemonic: '',
  },
  error: '',
  touched: {
    mnemonic: false,
  },
  values: {
    mnemonic: '',
  }
};

describe('RestoreWallet', () => {
  const defaultElement = <RestoreWallet {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
