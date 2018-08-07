import { storiesOf } from '@storybook/react';
import React from 'react';
import ImportWallet from './index';

const data = {
};

storiesOf('Components|Import Wallet', module).add('Default', () => {
  return <ImportWallet {...data} />;
});
