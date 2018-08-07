import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Input from './index';

storiesOf('Blocks|Input', module)
  .add('Default', () => {
    return <Input name="text" type="text" onChange={action('changed')} />;
  })
  .add('Disabled', () => {
    return <Input name="text" type="text" disabled={true} />;
  })
  .add('With placeholder', () => {
    return <Input name="text" type="text" placeholder="Placeholder..." />;
  })
  .add('With label', () => {
    return (
      <Input
        name="text"
        type="text"
        placeholder="Placeholder..."
        label="Label"
      />
    );
  })
  .add('With inside label', () => {
    return (
      <Input
        name="text"
        type="number"
        placeholder="0.000"
        label="Label"
        insideLabel={true}
      />
    );
  });
