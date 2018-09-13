import Wallet from '+/components/Wallet';
import React from 'react';
import Layout from '+/components/Layout';
import EthereumState from '+/components/EthereumState';

const Page = props => (
  <EthereumState>
    {state => (
      <Layout ethereumState={state}>
        <Wallet />
      </Layout>
    )}
  </EthereumState>
);

export default Page;
