import React from 'react';
import Loading from './index';

describe('Loading', () => {
  const defaultElement = <Loading />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without loading', () => {
    const defaultElement = <Loading loading={false} />;
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without dataAvailable', () => {
    const defaultElement = <Loading loading={false} dataAvailable={false} />;
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
