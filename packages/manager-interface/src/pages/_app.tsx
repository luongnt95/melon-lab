import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '~/shared/wrappers/withApollo';
import withReduxStore from '~/shared/wrappers/withReduxStore';

const debug = require('debug')('melon-lab:manager-interface:index');

if (typeof window !== 'undefined') {
  debug('Starting frontend:', {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      DEBUG: process.env.DEBUG,
      ELECTRON_PACKAGE: process.env.ELECTRON_PACKAGE,
      GRAPHQL_REMOTE_HTTP: process.env.GRAPHQL_REMOTE_HTTP,
      TRACK: process.env.TRACK,
    },
    isElectron: !!window.isElectron,
    release: {
      'manager-interface': __MANAGER_INTERFACE_VERSION__,
      'melon.js': __MELON_JS_VERSION__,
      'smart-contracts': __SMART_CONTRACTS_VERSION__,
    },
  });

  console.log(
    '%c👋🤓',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 30px',
  );

  console.log(
    '%cHello nerd. Checking out the internals of the ipfs-frontend? We like that! If you want to work with us, send us a message: team@melonport.com.',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 12px',
  );

  window.eval = global.eval = () => {
    throw new Error(`Sorry, this app does not support window.eval().`);
  };
}

class MelonApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withReduxStore(withApollo(MelonApp));
