import React from 'react';
import RadioButton from './index';

describe('RadioButton', () => {
  const defaultElement = (
    <RadioButton
      name={'Default name'}
      value={'Default value'}
      text={'Default text'}
    />
  );

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "radio-button"', () => {
    expect(shallow(defaultElement).is('.radio-button')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.radio-button').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default text');
  });
});
