import BigNumber from 'bignumber.js';
import { connect } from 'react-redux';
import {
  providers,
  getNetworkName,
  networks,
  tracks,
} from '@melonproject/melon.js';
import { withRouter } from 'next/router';
import App from '../components/App';
import { actions as routeActions } from '../actions/routes';
import { track } from '~/legacy/utils/track';

export const statusTypes = {
  NEUTRAL: 'NEUTRAL',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  GOOD: 'GOOD',
};

const getStatus = ({
  syncing,
  blockNumber,
  canonicalPriceFeedAddress,
  network,
  isConnected,
  isUpToDate,
  isReadyToVisit,
  isReadyToInvest,
  isReadyToInteract,
  isDataValid,
  provider,
}) => {
  if (!isConnected)
    return { message: 'Not connected to chain', type: statusTypes.ERROR };
  if (syncing) return { message: 'Node not synced', type: statusTypes.WARNING };
  if (blockNumber === 0)
    return { message: 'Loading ...', type: statusTypes.NEUTRAL };
  if (!isUpToDate)
    return { message: 'Block overdue', type: statusTypes.WARNING };
  if (!isReadyToVisit)
    return { message: 'Not ready', type: statusTypes.WARNING };
  if (!isDataValid)
    return {
      message: 'Price feed down',
      type: statusTypes.ERROR,
      link: `https://${
        network === networks.KOVAN ? 'kovan.' : ''
      }etherscan.io/address/${canonicalPriceFeedAddress}`,
    };
  if (!isReadyToInteract)
    return { message: 'Insufficent ETH', type: statusTypes.WARNING };
  if (!isReadyToInvest)
    return { message: 'Insufficent MLN', type: statusTypes.WARNING };
  if ([providers.PARITY, providers.INJECTED].includes(provider)) {
    return { message: 'Local node', type: statusTypes.GOOD };
  }
  return { message: 'Melon Node', type: statusTypes.NEUTRAL };
};

const mapStateToProps = (state, props) => {
  const { message, type, link } = getStatus({
    ...state.app,
    ...state.ethereum,
    ...state.fund.config,
  });

  return {
    ...props,
    usersFund: state.app.usersFund,
    onboardingState: state.app.onboardingState,
    isReadyToTrade: state.app.isReadyToTrade,
    isReadyToVisit: state.app.isReadyToVisit,
    walletAddress: state.ethereum.account,
    statusMessage: message,
    statusType: type,
    statusLink: link,
    mlnBalance: new BigNumber(state.ethereum.mlnBalance || 0).toFixed(4),
    ethBalance: new BigNumber(state.ethereum.ethBalance || 0).toFixed(4),
    wethBalance: new BigNumber(state.ethereum.wethBalance || 0).toFixed(4),
    fundAum: state.fund.nav,
    rootAction: routeActions.ranking(),
    accountAction: routeActions.wallet(),
    network: state.ethereum.network,
    networkName: getNetworkName(state.ethereum.network),
    showFaucet: track === tracks.KOVAN_DEMO,
    track,
  };
};

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(routeActions.ranking()),
  goToWallet: () => dispatch(routeActions.wallet()),
});

const AppContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));

export default AppContainer;
