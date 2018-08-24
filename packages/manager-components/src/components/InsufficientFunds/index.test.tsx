import React from 'react';
import InsufficientFunds from './index';

const data = {
  showFaucet: true,
  walletAddress: '0x0a3d3ea92917Dca8002A3cb5FC2e81D3b5217D50',
  ethBalance: '0',
  wethBalance: '0',
};

describe('InsufficientFunds', () => {
  const defaultElement = <InsufficientFunds {...data} />;

  it('should render correctly without walletAddress', () => {
    const defaultElement = <InsufficientFunds {...data} walletAddress="" />;
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick event', () => {
    global.open = jest.fn();
    const wrapper = shallow(defaultElement);
    wrapper.find('Button').simulate('click');
    expect(global.open).toBeCalled();
  });
});
