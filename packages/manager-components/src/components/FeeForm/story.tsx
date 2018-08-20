import { storiesOf } from '@storybook/react';
import React from 'react';
import FeeForm from './container';

const initialProps = {
  initialValues: {
    gasPrice: '20.000',
  },
  fees: [
    {
      description: 'Estimated max gas cost',
      gasLimit: 30000,
      gasPrice: '20',
      gasTotal: '0.0006',
    },
    {
      description: 'Estimated max gas cost',
      gasLimit: 30000,
      gasPrice: '20',
      gasTotal: '0.0006',
    },
  ],
};

storiesOf('Components|Fees Form', module).add('Default', () => {
  return <FeeForm {...initialProps} />;
});
