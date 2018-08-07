import React from 'react';
import Account from './index';

const data = {
  currentAddress: '0x270c65cb31d037E4269dC8F736350FDc8ED07353',
  associatedFund: '0x0890b03f83629B397F6E5E5075400fe6Ddb4255F',
  networkId: '42',
  isCompetition: false,
};

describe('Account', () => {
  const defaultElement = <Account {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
