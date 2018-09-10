import React, { Fragment } from 'react';

const Setup = ({}) => <Fragment>Hello World</Fragment>;

const withSetup = BaseComponent => baseProps => <BaseComponent />;

export default withSetup(Setup);
