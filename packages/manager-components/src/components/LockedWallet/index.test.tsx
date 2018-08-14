import React from 'react';
import LockedWallet from './index';

const data = {};

describe('LockedWallet', () => {
  const defaultElement = <LockedWallet {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
