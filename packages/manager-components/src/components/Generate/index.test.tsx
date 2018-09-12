import React from 'react';
import Generate from './index';

const data = {
  onSubmit: () => null,
  mnemonic: 'lorem ipsum',
};

describe('Generate', () => {
  const defaultElement = <Generate {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
