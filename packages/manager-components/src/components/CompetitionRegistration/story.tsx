import { storiesOf } from '@storybook/react';
import React from 'react';
import CompetitionRegistration from './index';

const data = {
  fundAddress: 'foo',
  managerAddress: 'foo',
  showedRegistration: true,
  skipRegistration: () => true,
  continueToSignCompetitionTerms: false,
  sign: () => true,
  isRegistered: false,
  competitionSignature: false,
  r: 'foo',
  s: 'foo',
  v: 'foo',
};

storiesOf('Components|Competition Registration', module).add('Default', () => {
  return <CompetitionRegistration {...data} />;
});
