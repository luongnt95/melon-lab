import { storiesOf } from '@storybook/react';
import React from 'react';
import Modal from './index';

const data = {
  isOpen: true,
  loading: true,
  title: 'Modal',
};

storiesOf('Blocks|Modal', module).add('Default', () => {
  return <Modal {...data}>Hello World</Modal>;
});
