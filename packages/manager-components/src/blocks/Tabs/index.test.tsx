import React from 'react';
import { TabContent, Tabs } from './index';

const data = {
  activeTabIndex: 0,
  handleTabClick: () => null,
};

describe('Tabs', () => {
  const defaultElement = (
    <Tabs {...data}>
      <TabContent title="Tab 0">Tab 0</TabContent>
      <TabContent title="Tab 1">Tab 1</TabContent>
    </Tabs>
  );

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
