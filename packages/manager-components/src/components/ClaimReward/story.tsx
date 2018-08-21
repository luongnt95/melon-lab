import { storiesOf } from '@storybook/react';
import React from 'react';
import ClaimReward from './index';

const data = {};

storiesOf('Components|Claim Reward', module).add('Default', () => {
  return <ClaimReward {...data} />;
});
