import React from 'react';
import OrderForm from './index';

describe('OrderForm', () => {
  const defaultElement = <OrderForm>Default text</OrderForm>;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  xit('should be selectable by class "order-form"', () => {
    expect(shallow(defaultElement).is('.order-form')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.order-form').length).toBe(1);
  });

  xit('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default text');
  });
});
