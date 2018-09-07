import React from 'react';
import Layout from '+/components/Layout';
import Manage from '+/components/Manage';
import { extractAddress, extractBaseSymbol, extractQuoteSymbol } from '~/utils/parseUrl';
import { withRouter } from 'next/router';
import {  } from '../utils/parseUrl';

const Page = (props) => (
  <Layout noHeader>
    <Manage
      address={extractAddress(props.router.asPath)}
      quote={extractQuoteSymbol(props.router.asPath)}
      base={extractBaseSymbol(props.router.asPath)}
    />
  </Layout>
);

export default withRouter(Page);
