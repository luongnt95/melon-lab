import React from 'react';
import Dropdown from './index';

describe('Dropdown', () => {
  const data = {
    name: 'dropdown',
    label: 'dropdown',
    options: [{ value: 'one', name: 'One' }, { value: 'two', name: 'Two' }],
  };
  const defaultElement = <Dropdown {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "dropdown"', () => {
    expect(shallow(defaultElement).is('.dropdown')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.dropdown').length).toBe(1);
  });

  it('should render to static HTML', () => {
    const getFirstOptionText = render(defaultElement)
      .find('option')
      .first()
      .text();

    expect(getFirstOptionText).toEqual('One');
  });

  it('should pass a selected value to the onChange handler', () => {
    const value = data.options[0];
    const onChange = jest.fn();
    const wrapper = shallow(<Dropdown {...data} onChange={onChange} />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('select').simulate('change', { target: { value: "value" } });
    expect(onChange).toBeCalledWith({ value: "value" }, { target: { value: "value" } });
  });
});
