import React from 'react';
import Layout from '+/components/Layout';
import EthereumState from '+/components/EthereumState';
import RestoreWallet from '+/components/RestoreWallet';

const Page = (props) => (
  <EthereumState>
    {(state) => (
      <Layout ethereumState={state}>
        <RestoreWallet />
      </Layout>
    )}
  </EthereumState>
);

export default Page;
