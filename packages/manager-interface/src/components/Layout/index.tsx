import React, { Fragment } from 'react'
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Content from '~/design/Layout';
import { networks } from '@melonproject/melon.js';
import displayNumber from '~/utils/displayNumber';

const displayNetwork = (network) => {
  const key = Object.values(networks).indexOf(network);
  const values = Object.keys(networks);
  return values[key] && values[key].toLocaleLowerCase();
};

const fixedTop = {
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1,
};

const fixedBottom = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  zIndex: 1,
};

const headerProps = (state) => ({
  address: state.accountAddress,
  balances: {
    eth: state.ethBalance && displayNumber(state.ethBalance),
  },
  network: state.ethereumNetwork && displayNetwork(state.ethereumNetwork),
  status: state.status,
});

const Layout = ({ children, noHeader = false, ethereumState = {} }) => (
  <Fragment>
    {!noHeader && (
      <div style={fixedTop}>
        <Header {...headerProps(ethereumState)} />
      </div>
    )}

    <Content foo="bar">{children}</Content>

    <div style={fixedBottom}>
      <Footer />
    </div>
  </Fragment>
);

export default Layout;