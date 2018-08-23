import { storiesOf } from '@storybook/react';
import React from 'react';
import Icon from './index';

const data = {
  name: 'logos_default',
};

storiesOf('Blocks|Icon', module).add('Default', () => {
  return <Icon {...data} />;
});
