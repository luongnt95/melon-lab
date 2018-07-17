import { storiesOf } from '@storybook/react';
import React from 'react';
import Header from './index';

const shortenAddress = address =>
  `${address.slice(0, 6)}…${address.substr(-4)}`;

const status = {
  message: 'Melon Node',
};

const balances = {
  eth: 1.23422234,
};

const account = {
  address: shortenAddress('0x32Be343B94f860124dC4fEe278FDCBD38C102D88'),
  link: '#',
};

const data = {
  status,
  balances,
  account,
  network: 'kovan'
};

storiesOf('Components|Header', module).add('Default', () => {
  return <Header {...data} />;
});
