import React from 'react';
import Checkbox from './index';

describe('Checkbox', () => {
  const defaultElement = (
    <Checkbox
      name={'Default name'}
      value={'Default value'}
      text={'Default text'}
    />
  );

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be selectable by class "checkbox"', () => {
    expect(shallow(defaultElement).is('.checkbox')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(defaultElement).find('.checkbox').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(defaultElement).text()).toEqual('Default text');
  });
});
