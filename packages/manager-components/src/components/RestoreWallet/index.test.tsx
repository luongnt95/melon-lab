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
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
