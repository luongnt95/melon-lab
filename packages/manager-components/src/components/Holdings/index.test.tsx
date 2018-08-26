import React from 'react';
import Holdings from './index';

const mockCallback = jest.fn();
const data = {
  isReadyToTrade: true,
  dataValid: true,
  quoteAsset: 'WETH-T',
  selectAsset: mockCallback,
  holdings: [
    { name: 'ANT-T', balance: '0.0000', price: '0.0035', percentage: '0.0000' },
    { name: 'BAT-T', balance: '0.0000', price: '0.0007', percentage: '0.0000' },
    { name: 'DGD-T', balance: '0.0000', price: '0.0000', percentage: '0.0000' },
    { name: 'DGX-T', balance: '0.0000', price: '0.0000', percentage: '0.0000' },
    { name: 'GNO-T', balance: '0.0000', price: '0.1113', percentage: '0.0000' },
    { name: 'REP-T', balance: '0.0000', price: '0.0648', percentage: '0.0000' },
    { name: 'ZRX-T', balance: '0.0000', price: '0.0024', percentage: '0.0000' },
    { name: 'REQ-T', balance: '0.0000', price: '0.0001', percentage: '0.0000' },
    {
      name: 'WETH-T',
      balance: '0.5166',
      price: '1.0000',
      percentage: '50.5764',
    },
    {
      name: 'MLN-T',
      balance: '10.7338',
      price: '0.0470',
      percentage: '49.4236',
    },
    { name: 'MKR-T', balance: '0.0000', price: '1.3430', percentage: '0.0000' },
    { name: 'DAI-T', balance: '0.0000', price: '0.0021', percentage: '0.0000' },
    { name: 'KNC-T', balance: '0.0000', price: '0.0276', percentage: '0.0000' },
    { name: 'JNT-T', balance: '0.0000', price: '0.0003', percentage: '0.0000' },
    { name: 'OMG-T', balance: '0.0000', price: '0.0150', percentage: '0.0000' },
    { name: 'NMR-T', balance: '0.0000', price: '0.0184', percentage: '0.0000' },
  ],
};

describe('Holdings', () => {
  const defaultElement = <Holdings {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly without dataValid ', () => {
    wrapper.setProps({ dataValid: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick event', () => {
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][2]).toEqual(data.quoteAsset);
  });
});
