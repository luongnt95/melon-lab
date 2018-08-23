import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import GenerateWallet from './index';

const data = {
  mnemonic:
    'next glass shell collect erupt image drive tumble motor gym glove inside',
  restore: action('restore'),
};

storiesOf('Components|Generate Wallet', module).add('Default', () => {
  return <GenerateWallet {...data} />;
});
