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
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly without walletAddress', () => {
    wrapper.setProps({ walletAddress: undefined });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick event', () => {
    global.open = jest.fn();
    wrapper.find('Button').simulate('click');
    expect(global.open).toBeCalled();
  });
});
