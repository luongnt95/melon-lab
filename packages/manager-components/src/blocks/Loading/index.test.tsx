import React from 'react';
import Loading from './index';

describe('Loading', () => {
  const defaultElement = <Loading />;
  let customElement;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without loading', () => {
    customElement = <Loading loading={false} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without dataAvailable', () => {
    customElement = <Loading loading={false} dataAvailable={false} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });
});
