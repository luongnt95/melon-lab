import { storiesOf } from '@storybook/react';
import React from 'react';
import ExecuteRequest from './index';

const data = {
};

storiesOf('Components|Execute Request', module).add('Default', () => {
  return <ExecuteRequest {...data} />;
});
