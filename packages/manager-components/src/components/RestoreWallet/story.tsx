import { storiesOf } from '@storybook/react';
import React from 'react';
import RestoreWallet from './container';

const data = {
  initialValues: {
    mnemonic: '',
  },
  error: '',
};

storiesOf('Components|Restore Wallet', module).add('Default', () => {
  return <RestoreWallet {...data} />;
});
