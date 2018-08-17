import React from 'react';
import ContributionForm from './container';

const initialProps = {
  initialValues: {
    amount: '',
    total: '',
  },
  dataValid: true,
  melonAssetSymbol: 'MLN',
};

describe('ContributionForm', () => {
  const defaultElement = <ContributionForm {...initialProps} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
