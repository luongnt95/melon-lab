import React from 'react';
import Layout from '+/components/Layout';
import Manage from '+/components/Manage';
import EthereumState from '+/components/EthereumState';
import { networks } from '@melonproject/melon.js';
import { extractAddress, extractBaseSymbol, extractQuoteSymbol } from '~/utils/parseUrl';
import displayNumber from '~/utils/displayNumber';
import { withRouter } from 'next/router';

const displayNetwork = (network) => {
  const key = Object.values(networks).indexOf(network);
  const values = Object.keys(networks);
  return values[key] && values[key].toLocaleLowerCase();
};

const Page = (props) => (
  <EthereumState>
    {(state) => (
      <Layout headerProps={{
        accountAddress: state.accountAddress,
        balances: {
          eth: state.ethBalance && displayNumber(state.ethBalance),
        },
        network: state.ethereumNetwork && displayNetwork(state.ethereumNetwork),
        status: state.status,
      }}>
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
