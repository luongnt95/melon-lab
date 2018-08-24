import React from 'react';
import Administration from './index';

const data = {
  toggleSubscription: () => null,
  convertUnclaimedRewards: () => null,
  shutdown: () => null,
  quoteAsset: 'MLN',
};

describe('Administration', () => {
  const defaultElement = <Administration {...data} />;
  let customElement;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with loading', () => {
    customElement = <Administration {...data} loading />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with subscriptionAllowed', () => {
    customElement = <Administration {...data} subscriptionAllowed />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });
});
