import React from 'react';
import { onboardingPath } from '~/legacy/reducers/app';
import WrongNetwork from '@melonproject/manager-components/components/WrongNetwork';
import NoConnection from '@melonproject/manager-components/components/NoConnection';
import LockedWallet from '@melonproject/manager-components/components/LockedWallet';
import InsufficientFunds from '@melonproject/manager-components/components/InsufficientFunds';
import TermsAndConditionsContainer from '~/legacy/containers/TermsAndConditions';
import SetupContainer from '~/legacy/containers/Setup';
import ParosContributionContainer from '~/legacy/containers/ParosContribution';
import ParticipationContainer from '~/legacy/containers/Participation';

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

const Setup = (props) => {
  const Component = mapOnboardingStateToMainContainer(props.onboardingState, props.track);
  return Component && <Component {...props} />;
};

export default Setup;
