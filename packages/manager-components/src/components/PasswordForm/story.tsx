import { storiesOf } from '@storybook/react';
import React from 'react';
import PasswordForm from './container';

const initialProps = {
  initialValues: {
    password: '',
  },
};

storiesOf('Components|Password Form', module).add('Default', () => {
  return <PasswordForm {...initialProps} />;
});
