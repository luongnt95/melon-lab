import React from 'react';
import Icon from './index';

const data = {
  name: 'logos_default',
  iconClass: 'iconClass',
};

describe('Icon', () => {
  const defaultElement = <Icon {...data} />;
  let customElement;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with width', () => {
    customElement = <Icon {...data} width="1px" />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with height', () => {
    customElement = <Icon {...data} height="1px" />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });
});
