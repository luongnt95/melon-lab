import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Generate from './';

const data = {
  generatedMnemonic:
    'next glass shell collect erupt image drive tumble motor gym glove inside',
  onSubmit: action('restore'),
};

storiesOf('Components|Generate', module).add('Default', () => {
  return <Generate {...data} />;
});
