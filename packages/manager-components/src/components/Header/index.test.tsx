import React from 'react';
import Header from './index';

const status = {
  message: 'Melon Node',
};

const balances = {
  eth: 1.23422234,
};

const account = {
  address: '0xa80B…d46f',
};

const data = {
  status,
  balances,
  account,
  network: 'kovan',
};

describe('Header', () => {
  const defaultElement = <Header {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
