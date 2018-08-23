import React from 'react';
import LockedWallet from './index';

describe('LockedWallet', () => {
  const defaultElement = <LockedWallet />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
