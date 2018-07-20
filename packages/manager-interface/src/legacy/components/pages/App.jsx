import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import WrongNetwork from '../organisms/WrongNetwork';
import NoConnection from '../organisms/NoConnection';
import LockedWallet from '../organisms/LockedWallet';
import InsufficientFunds from '../organisms/InsufficientFunds';
import TermsAndConditionsContainer from '../../containers/TermsAndConditions';
import SetupContainer from '../../containers/Setup';
import ParosContributionContainer from '../../containers/ParosContribution';
import { onboardingPath } from '../../reducers/app';
import FundContainer from '../../containers/Fund';
import RankingContainer from '../../containers/Ranking';
import ParticipationContainer from '../../containers/Participation';
import WalletContainer from '../../containers/wallet/Account';
import WalletGenerate from '../../containers/wallet/Generate';
import RestoreContainer from '../../containers/wallet/Restore';
import ImportContainer from '../../containers/wallet/Import';
import CompetitionRegistrationContainer from '../../containers/CompetitionRegistration';
import OlympiadPlaceholderContainer from '../../containers/OlympiadPlaceholder';
import Modal from '../../containers/Modal';
import { types } from '../../actions/routes';
import ConnectionInfo from '../organisms/ConnectionInfo';
import { greaterThan } from '../../utils/functionalBigNumber';
import Header from '@melonproject/manager-components/components/Header';
import Footer from '@melonproject/manager-components/components/Footer';
import '~/static/images/logos.svg';

const shortenAddress = address =>
  `${address.slice(0, 6)}…${address.substr(-4)}`;

const mapOnboardingStateToMainContainer = (onboardingState, track) => {
  const map = {
    [onboardingPath.NO_PROVIDER]: NoConnection,
    [onboardingPath.NO_CONNECTION]: NoConnection,
    [onboardingPath.WRONG_NETWORK]: WrongNetwork,
    [onboardingPath.LOCKED_ACCOUNT]: LockedWallet,
    [onboardingPath.INSUFFICIENT_FUNDS]: InsufficientFunds,
    [onboardingPath.NOT_SIGNED]: TermsAndConditionsContainer,
    [onboardingPath.NO_FUND_CREATED]: SetupContainer,
    [onboardingPath.NOT_INVESTED_IN_OWN_FUND]:
    track !== 'kovan-demo'
      ? ParosContributionContainer
      : ParticipationContainer,
  };

  return map[onboardingState];
};

const routeContainerMap = {
  [types.ROOT]: RankingContainer,
  [types.RANKING]: RankingContainer,
  [types.WALLET_GENERATE]: WalletGenerate,
  [types.WALLET_RESTORE]: RestoreContainer,
  [types.WALLET_CREATE]: WalletContainer,
  [types.WALLET_IMPORT]: ImportContainer,
  [types.FUND]: FundContainer,
  [types.WALLET]: WalletContainer,
  [types.COMPETITION]: CompetitionRegistrationContainer,
};

const getMainComponent = ({
  onboardingState,
  mlnBalance,
  ethBalance,
  wethBalance,
  usersFund,
  showFaucet,
  walletAddress,
  route,
  network,
  networkName,
  track,
  isElectron
}) => {
  const Main =
    route === types.SETUP
      ? mapOnboardingStateToMainContainer(onboardingState, track)
      : routeContainerMap[route];
  return Main ? (
    <Main
      mlnBalance={mlnBalance}
      ethBalance={ethBalance}
      wethBalance={wethBalance}
      setup
      usersFund={usersFund}
      walletAddress={walletAddress}
      network={network}
      showFaucet={showFaucet}
    />
  ) : (
      <div />
    );
};

const App = props => {
  const headerData = {
    status: {
      message: props.statusMessage,
      type: props.statusType,
    },
    balances: {
      eth: props.ethBalance,
    },
    network: props.networkName,
    account: {
      type: Link,
      action: props.accountAction,
      address: shortenAddress(props.walletAddress || ''),
    },
    home: {
      type: Link,
      action: props.rootAction,
    },
  };
  return (
    <div className="App">
      {props.network !== '42' &&
        (greaterThan(props.ethBalance, 1) || greaterThan(props.fundNav, 1)) && !props.isElectron && (
          <a
            href="https://github.com/melonproject/melon-lab/releases"
            target="_blank"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'rgb(209, 102, 102)',
              color: 'white',
              fontWeight: 'bold',
              padding: 10,
              zIndex: 10,
            }}
          >
            {' '}
            Warning: You are using the Melon Interface in an insecure
            environment (your browser) and putting your funds at risk! Please be
            a good citizen and download our Electron app and run your own node
            for a fast and secure experience.
          </a>
        )}

      <div
        style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1,
        }}
      >
        <Header {...headerData} />
      </div>

      <Container
        style={{
          paddingTop: '70px',
          paddingBottom: '70px',
        }}
      >
        {getMainComponent(props)}
      </Container>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Footer />
      </div>
      <Modal />
    </div>
  );
};

export default App;
