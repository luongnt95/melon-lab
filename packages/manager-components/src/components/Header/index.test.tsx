import React from 'react';
import Header from './index';

const mockCallbackHome = jest.fn();
const mockCallbackWallet = jest.fn();
const data = {
  balances: {
    eth: 1.23422234,
  },
  account: {
    address: '0xa80B…d46f',
  },
  network: 'kovan',
  goToHome: mockCallbackHome,
  goToWallet: mockCallbackWallet,
  status: {
    message: 'message',
    type: 'type',
  },
};

describe('Header', () => {
  const defaultElement = <Header {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with status', () => {
    const defaultElement = <Header {...data} status={{ link: 'linkr' }} />;
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick go to home event', () => {
    const wrapper = shallow(defaultElement);
    wrapper.find('.header__logo a').simulate('click', { preventDefault() {} });
    expect(mockCallbackHome.mock.calls.length).toBe(1);
  });

  it('onClick go to wallet event', () => {
    const wrapper = shallow(defaultElement);
    wrapper
      .find('.header__account-address a')
      .simulate('click', { preventDefault() {} });
    expect(mockCallbackWallet.mock.calls.length).toBe(1);
  });
});
