import React from 'react';
import Switch from './index';

describe('Switch', () => {
  const options = [
    'ETH-T-M',
    'MLN-T-M',
  ];

  const labels = [
    'Buy',
    'Sell',
  ];

  const defaultElement = <Switch options={options} labels={labels} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "switch"', () => {
    expect(shallow(defaultElement).is('.switch')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.switch').length).toBe(1);
  });
});
