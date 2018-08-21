import React from 'react';
import OlympiadPlaceholder from './index';

const data = {};

describe('OlympiadPlaceholder', () => {
  const defaultElement = <OlympiadPlaceholder {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
