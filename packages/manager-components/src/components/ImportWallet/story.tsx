import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ImportWallet from './index';

const data = {
  parseWallet: action('parseWallet'),
  goToAccount: action('goToAccount'),
};

storiesOf('Components|Import Wallet', module).add('Default', () => {
  return <ImportWallet {...data} />;
});
