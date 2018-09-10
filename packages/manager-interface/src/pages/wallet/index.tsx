import React from 'react';
import Layout from '+/components/Layout';
import EthereumState from '+/components/EthereumState';

const Page = (props) => (
  <EthereumState>
    {(state) => (
      <Layout ethereumState={state}>
        <div>Hello world!</div>
      </Layout>
    )}
  </EthereumState>
);

export default Page;
