import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { isZero } from '~/utils/functionalBigNumber';
import { networks, providers } from '@melonproject/melon.js';

export const statusTypes = {
  NEUTRAL: 'NEUTRAL',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  GOOD: 'GOOD',
};

const getStatus = ({
  canonicalPriceFeedAddress,
  currentBlock,
  ethereumNetwork,
  isSyncing,
  isNetworkValid,
  isReadyToInvest,
  isReadyToInteract,
  isDataValid,
  provider,
}) => {
  if (!currentBlock) {
    return {
      message: 'Block overdue',
      type: statusTypes.WARNING,
    };
  }

  if (!isNetworkValid) {
    return {
      message: 'Not ready',
      type: statusTypes.WARNING,
    };
  }

  if (isSyncing) {
    return {
      message: 'Node not synced',
      type: statusTypes.WARNING,
    };
  }

  if (!isDataValid) {
    return {
      message: 'Price feed down',
      type: statusTypes.ERROR,
      link: `https://${
        ethereumNetwork === networks.KOVAN ? 'kovan.' : ''
      }etherscan.io/address/${canonicalPriceFeedAddress}`,
    };
  }

  if (!isReadyToInteract) {
    return {
      message: 'Insufficent ETH',
      type: statusTypes.WARNING,
    };
  }

  if (!isReadyToInvest) {
    return {
      message: 'Insufficent MLN',
      type: statusTypes.WARNING,
    };
  }

  if ([providers.PARITY, providers.INJECTED].includes(provider)) {
    return {
      message: 'Local node',
      type: statusTypes.GOOD,
    };
  }

  return {
    message: 'Melon Node',
    type: statusTypes.NEUTRAL,
  };
};

const ethereumQuery = gql`
  query ConnectionStateQuery {
    ethereumNetwork @client
    isSyncing @client
    isDataValid @client
    currentBlock @client
    ethBalance @client
    wethBalance @client
    mlnBalance @client
    accountAddress @client
    canonicalPriceFeedAddress @client
    competitionComplianceAddress @client
    onlyManagerCompetitionAddress @client
  }
`;

const EthereumState = ({ children }) => (
  <Query query={ethereumQuery} pollInterval={10000} ssr={false}>
    {props => {
      const { data = {}, loading } = props;

      const isSyncing = !!data.isSyncing;
      const isNetworkValid =
        (!!data.ethereumNetwork && data.ethereumNetwork === '42') ||
        data.ethereumNetwork === '1';
      const hasAccount = !!data.accountAddress;
      const hasEth = data.ethBalance && !isZero(data.ethBalance);
      const hasCurrentBlock = data.currentBlock && !isZero(data.currentBlock);

      const state = {
        ...data,
        isNetworkValid,
        isReadyToInteract:
          !isSyncing &&
          isNetworkValid &&
          hasAccount &&
          hasCurrentBlock &&
          hasEth,
        isReadyToInvest: false,
      };

      return children({
        ...state,
        status: !loading && getStatus(state),
        loading,
      });
    }}
  </Query>
);

export default EthereumState;
