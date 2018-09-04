import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import GenerateWallet from './container';

const data = {
  generatedMnemonic:
    'next glass shell collect erupt image drive tumble motor gym glove inside',
  restore: action('restore'),
  onSubmitMnemonic: action('onSubmit'),
  restoreWallet: {
    initialValues: {
      mnemonic: '',
    },
  },
  passwordForm: {
    onSubmit: action('onSubmit'),
    initialValues: {
      password: 'abc',
    },
  },
};

storiesOf('Components|Generate Wallet', module).add('Default', () => {
  return <GenerateWallet {...data} />;
});
