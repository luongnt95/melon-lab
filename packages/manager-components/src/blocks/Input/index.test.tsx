import React from 'react';
import Input from './index';

describe('Input', () => {
  const defaultElement = <Input />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "input"', () => {
    expect(
      shallow(defaultElement)
        .find('.input')
        .is('.input'),
    ).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.input').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('');
  });

  it('should pass a typed value to the onChange handler', () => {
    const value = 'Hello World';
    const onChange = jest.fn();
    const wrapper = shallow(<Input onInputChange={onChange} />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').simulate('change', value);
    expect(onChange).toBeCalledWith(value);
  });
});
