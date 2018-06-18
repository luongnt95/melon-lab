import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderForm from './index';

storiesOf('Components|Order Form', module)
  .add('Default', () => {
    return <OrderForm>Order Form</OrderForm>;
  });
