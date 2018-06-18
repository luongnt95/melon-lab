import React from 'react';
import Form from './index';

describe('Form', () => {
  const defaultElement = <Form>Default form</Form>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "form"', () => {
    expect(shallow(defaultElement).is('.form')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.form').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default form');
  });
});
