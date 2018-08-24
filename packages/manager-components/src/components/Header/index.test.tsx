import React from 'react';
import Header from './index';

const data = {
  status: { message: 'Melon Node' },
  balances: {
    eth: 1.23422234,
  },
  account: {
    address: '0xa80B…d46f',
  },
  network: 'kovan',
  goToHome: () => null,
  goToWallet: () => null,
};

describe('Header', () => {
  const defaultElement = <Header {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
