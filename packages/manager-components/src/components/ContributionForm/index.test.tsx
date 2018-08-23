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

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
