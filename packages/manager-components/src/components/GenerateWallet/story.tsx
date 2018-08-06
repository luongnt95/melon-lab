import { storiesOf } from '@storybook/react';
import React from 'react';
import GenerateWallet from './index';

const data = {
  mnemonic:
    'next glass shell collect erupt image drive tumble motor gym glove inside',
};

storiesOf('Components|Generate Wallet', module).add('Default', () => {
  return <GenerateWallet {...data} />;
});
