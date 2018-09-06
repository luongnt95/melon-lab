import React from 'react';
import ModalContainer from '../containers/Modal';
import Header from '@melonproject/manager-components/components/Header';
import Footer from '@melonproject/manager-components/components/Footer';
import Layout from '@melonproject/manager-components/design/Layout';
import '~/static/images/logos.svg';
import '~/static/images/icons.svg';

const shortenAddress = address =>
  `${address.slice(0, 6)}…${address.substr(-4)}`;

const App = ({ Component, ...props }) => {
  const headerData = {
    status: {
      message: props.statusMessage,
      type: props.statusType,
    },
    balances: {
      eth: props.ethBalance,
    },
    network: props.networkName,
    accountAddress: shortenAddress(props.walletAddress || ''),
    goToHome: props.goToHome,
    goToWallet: props.goToWallet,
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

  return (
    <div className="App">
      <div style={fixedTop}>
        <Header {...headerData} />
      </div>

      <Layout>
        <Component {...props} />
      </Layout>

      <div style={fixedBottom}>
        <Footer />
      </div>

      <ModalContainer />
    </div>
  );
};

export default App;
