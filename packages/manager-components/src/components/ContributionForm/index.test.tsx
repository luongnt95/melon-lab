import React from 'react';
import ContributionForm from './container';

const data = {
  initialValues: {
    amount: '',
    total: '',
  },
  dataValid: true,
  melonAssetSymbol: 'MLN',
};

describe('ContributionForm', () => {
  const defaultElement = <ContributionForm {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
