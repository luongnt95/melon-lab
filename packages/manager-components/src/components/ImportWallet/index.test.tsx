import React from 'react';
import ImportWallet from './index';

const data = {
};

describe('Header', () => {
  const defaultElement = <ImportWallet {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
