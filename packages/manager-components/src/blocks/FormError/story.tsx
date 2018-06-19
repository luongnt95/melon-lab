import { storiesOf } from '@storybook/react';
import React from 'react';
import FormError from './index';

storiesOf('Blocks|Form Error', module)
  .add('Default', () => {
    return <FormError>Default button</FormError>;
  });
