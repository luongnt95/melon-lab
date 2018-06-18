import React from 'react';
import { TabContent, Tabs } from './index';

describe('Tabs', () => {
  const defaultElement = (
    <Tabs>
      <TabContent>Tab 0</TabContent>
      <TabContent>Tab 1</TabContent>
    </Tabs>
  );

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "tabs"', () => {
    expect(shallow(defaultElement).is('.tabs')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.tabs').length).toBe(1);
  });

  xit('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Tabs');
  });
});
