import React, { Fragment } from 'react';
import Setup from '@melonproject/manager-components/components/Setup/container';
import { compose, withPropsOnChange, withHandlers } from 'recompose';

const withSetup = BaseComponent => baseProps => (
  <BaseComponent config={baseProps.ethereumState} />
);

export default compose(withSetup)(Setup);
