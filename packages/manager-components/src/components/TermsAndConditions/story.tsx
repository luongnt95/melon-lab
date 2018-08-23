import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import TermsAndConditions from './index';

const data = {
  sign: action('sign'),
};

storiesOf('Components|Terms And Conditions', module)
  .add('Default', () => {
    return <TermsAndConditions {...data} />;
  })
  .add('Network 1', () => {
    return <TermsAndConditions {...data} networkId="1" />;
  });
