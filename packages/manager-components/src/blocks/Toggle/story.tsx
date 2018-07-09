import { storiesOf } from '@storybook/react';
import React from 'react';
import Toggle from './index';

const func = () => true;

storiesOf('Blocks|Toggle', module)
  .add('Default', () => {
    return (
      <Toggle
        name="strategy"
        value="Limit"
        text="Limit"
        onChange={func}
      />
    );
  })
  .add('Is checked', () => {
    return (
      <Toggle
        name="strategy"
        value="Limit"
        text="Limit"
        isChecked={true}
        onChange={func}
      />
    );
  });
