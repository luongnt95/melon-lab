import React from 'react';
import Icon from './index';

describe('Icon', () => {
  const defaultElement = <Icon name="logos_default" />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "icon"', () => {
    expect(shallow(defaultElement).is('.icon')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.icon').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('');
  });
});
