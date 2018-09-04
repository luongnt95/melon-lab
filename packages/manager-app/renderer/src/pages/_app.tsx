import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactModal from 'react-modal';
import { Provider as ReduxProvider } from 'react-redux';
import withApollo from '../wrappers/withApollo';
import withReduxStore from '~/wrappers/withReduxStore';
import AppContainer from '~/legacy/containers/App';

if (typeof window !== 'undefined') {
  window.eval = global.eval = () => {
    throw new Error('Sorry, this app does not support window.eval().');
  };

  ReactModal.setAppElement('#__next');
}

class MelonApp extends App {
  public render() {
    const { Component, apollo, redux, pageProps } = this.props;

    return (
      <Container>
        <ReduxProvider store={redux}>
          <ApolloProvider client={apollo}>
            <AppContainer Component={Component} {...pageProps} />
          </ApolloProvider>
        </ReduxProvider>
      </Container>
    );
  }
}

export default withApollo(withReduxStore(MelonApp));
