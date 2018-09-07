import React from 'react';
import Layout from '+/components/Layout';
import Ranking from '+/components/Ranking';
import GetStarted from '+/components/GetStarted';

const Page = (props) => (
  <Layout noHeader>
    <GetStarted isHome />
    <Ranking />
  </Layout>
);

export default Page;
