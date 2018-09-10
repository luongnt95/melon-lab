import React from 'react';
import Layout from '+/components/Layout';
import Manage from '+/components/Manage';
import EthereumState from '+/components/EthereumState';
import { extractAddress, extractBaseSymbol, extractQuoteSymbol } from '~/utils/parseUrl';
import { withRouter } from 'next/router';

const Page = (props) => (
  <EthereumState>
    {(state) => (
      <Layout ethereumState={state}>
        <Manage
          address={extractAddress(props.router.asPath)}
          quote={extractQuoteSymbol(props.router.asPath)}
          base={extractBaseSymbol(props.router.asPath)}
        />
      </Layout>
    )}
  </EthereumState>
);

export default withRouter(Page);
