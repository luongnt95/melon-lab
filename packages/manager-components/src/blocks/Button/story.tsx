import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from './index';

storiesOf('Blocks|Button', module)
  .add('Default', () => {
    return <Button onClick={action('clicked')}>Default button</Button>;
  })
  .add('Secondary', () => {
    return (
      <Button style="secondary" onClick={action('clicked')}>
        Secondary button
      </Button>
    );
  })
  .add('Disabled', () => {
    return <Button disabled={true}>Disabled button</Button>;
  })
  .add('Small', () => {
    return <Button size="small">Small button</Button>;
  })
  .add('Large', () => {
    return <Button size="large">Large button</Button>;
  })
  .add('Warning', () => {
    return <Button style="warning">Warning button</Button>;
  })
  .add('Danger', () => {
    return <Button style="danger">Danger button</Button>;
  })
  .add('Success', () => {
    return <Button style="success">Success button</Button>;
  });
