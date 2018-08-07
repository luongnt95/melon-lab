import { storiesOf } from '@storybook/react';
import React from 'react';
import Administration from './index';

const data = {
};

storiesOf('Components|Administration', module).add('Default', () => {
  return <Administration {...data} />;
});
