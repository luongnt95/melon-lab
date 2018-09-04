import React, { Fragment } from 'react';
import GetStarted from '~/legacy/containers/GetStarted';
import Ranking from '~/legacy/containers/Ranking';

const Index = (props) => (
  <Fragment>
    <GetStarted isHome />
    <Ranking />
  </Fragment>
);

export default Index;
