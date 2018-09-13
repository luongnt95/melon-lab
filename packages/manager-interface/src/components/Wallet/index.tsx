import React from 'react';
import Account from '@melonproject/manager-components/components/Account';
import { compose, withProps } from 'recompose';

const withSetup = BaseComponent => baseProps => <BaseComponent />;

export default compose(withSetup)(Account);
