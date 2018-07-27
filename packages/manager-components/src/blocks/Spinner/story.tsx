import { storiesOf } from '@storybook/react';
import React from 'react';
import Spinner from './index';

storiesOf('Blocks|Spinner', module)
  .add('Default', () => {
    return <Spinner />;
  })
  .add('Small', () => {
    return <Spinner size="small" />;
  });
