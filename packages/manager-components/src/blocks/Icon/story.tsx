import { storiesOf } from '@storybook/react';
import React from 'react';
import Icon from './index';

storiesOf('Blocks|Icon', module).add('Default', () => {
  return <Icon name="logos_default" />;
});
