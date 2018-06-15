import React from 'react';
import Button from './index';

describe('Button', () => {
  const defaultElement = <Button>Default button</Button>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "button"', () => {
    expect(shallow(defaultElement).is('.button')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.button').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default button');
  });
});
