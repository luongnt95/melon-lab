import React from 'react';
import GenerateWallet from './index';

const data = {
  restore: () => null,
  mnemonic: 'lorem ipsum',
};

describe('GenerateWallet', () => {
  const defaultElement = <GenerateWallet {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
