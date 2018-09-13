import GenerateWallet from '+/components/GenerateWallet';
import React from 'react';
import Layout from '+/components/Layout';
import EthereumState from '+/components/EthereumState';
import { withRouter } from 'next/router';

const Page = props => (
  <EthereumState>
    {state => (
      <Layout ethereumState={state}>
        <GenerateWallet {...props} />
      </Layout>
    )}
  </EthereumState>
);

export default withRouter(Page);
