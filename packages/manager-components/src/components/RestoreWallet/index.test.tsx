import React from 'react';
import RestoreWallet from './container';

const data = {
  initialValues: {
    mnemonic: '',
  },
  onSubmit: () => null,
};

describe('RestoreWallet', () => {
  const defaultElement = <RestoreWallet {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
