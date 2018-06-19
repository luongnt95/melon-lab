import React from 'react';
import FormError from './index';

describe('Button', () => {
  const defaultElement = <FormError>Default error</FormError>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "form-error"', () => {
    expect(shallow(defaultElement).is('.form-error')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.form-error').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default error');
  });
});
