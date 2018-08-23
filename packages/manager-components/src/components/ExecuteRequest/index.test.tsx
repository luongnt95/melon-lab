import React from 'react';
import ExecuteRequest from './index';

const data = {
  onExecute: () => null,
  readyToExecute: true,
  requestId: 1,
};

describe('ExecuteRequest', () => {
  const defaultElement = <ExecuteRequest {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
