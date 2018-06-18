import { storiesOf } from '@storybook/react';
import React from 'react';
import Dropdown from './index';

const options = [{ value: 'one', name: 'One' }, { value: 'two', name: 'Two' }];

storiesOf('Blocks|Dropdown', module)
  .add('Default', () => {
    return <Dropdown options={options} />;
  })
  .add('With label', () => {
    return <Dropdown label="Exchange" options={options} />;
  });
