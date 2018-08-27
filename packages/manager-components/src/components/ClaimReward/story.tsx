import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import ClaimReward from './index';

const data = {
  competitionName: 'Naxos',
  claimReward: action('claimReward'),
  isCompetitionActive: false,
  endTime: 'Tomorrow',
  redeemParosShares: action('redeemParosShares'),
  reportUrl: 'https://melon-reporting.now.sh/browse',
};

storiesOf('Components|Claim Reward', module).add('Default', () => {
  return <ClaimReward {...data} />;
});
