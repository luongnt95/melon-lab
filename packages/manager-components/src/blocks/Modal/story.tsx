import { storiesOf } from '@storybook/react';
import React from 'react';
import Modal from './index';

storiesOf('Blocks|Modal', module).add('Default', () => {
  return (
    <Modal isOpen loading title="Hello World">
      Hello World
    </Modal>
  );
});
