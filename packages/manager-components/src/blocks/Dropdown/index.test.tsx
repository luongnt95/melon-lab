import React from 'react';
import Dropdown from './index';

describe('Dropdown', () => {
  const options = [
    { value: 'one', name: 'One' },
    { value: 'two', name: 'Two' },
  ];
  const defaultElement = <Dropdown options={options} selectedItem={'one'} />;

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
    const value = options[0];
    const onChange = jest.fn();
    const wrapper = shallow(
      <Dropdown onChange={onChange} options={options} />,
    );

    expect(wrapper).toMatchSnapshot();
    wrapper.find('select').simulate('change', options[0]);
    expect(onChange).toBeCalledWith(value);
  });
});
