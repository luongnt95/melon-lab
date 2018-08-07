import { storiesOf } from '@storybook/react';
import React from 'react';
import TermsAndConditions from './index';

const data = {
  networkId: '1'
};

storiesOf('Components|Terms And Conditions', module)
  .add('Default', () => {
    return <TermsAndConditions />;
  })
  .add('Network 1', () => {
    return <TermsAndConditions {...data} />;
  });
