import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Input from './index';

storiesOf('Blocks|Input', module)
  .add('Default', () => {
    return <Input onInputChange={action('changed')} />;
  })
  .add('Disabled', () => {
    return <Input disabled={true} />;
  })
  .add('With placeholder', () => {
    return <Input placeholder="Placeholder..." />;
  })
  .add('With label', () => {
    return <Input placeholder="Placeholder..." label="Label" />;
  })
  .add('With inside label', () => {
    return (
      <Input
        type="number"
        placeholder="0.000"
        label="Label"
        insideLabel={true}
      />
    );
  });
