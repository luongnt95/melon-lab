import {
  getParityProvider,
  getParticipation,
  getBalance,
  getConfig,
  getAccountAddress,
  hasRecentPrice,
  toReadable,
  createWallet,
  importWalletFromMnemonic,
  encryptWallet
} from '@melonproject/melon.js';
import * as R from 'ramda';
import ethereumNetwork from './etherumNetwork';
import personalStake from './personalStake';
import wallet from './wallet';
import getNextConfig from 'next/config';

const { publicRuntimeConfig: nextConfig } = getNextConfig();

export const defaults = {
  ethereumNetwork: null,
  melonBalance: null,
  etherBalance: null,
  walletAddress: null,
  isSyncing: null,
  isDataValid: null,
  canonicalPriceFeedAddress: null,
  competitionComplianceAddress: null,
  onlyManagerCompetitionAddress: null,
};

export const resolvers = R.reduce(R.mergeDeepLeft, {})([
  ethereumNetwork,
  personalStake,
  wallet,
]);

let environment;
let config;
let network;

export const withContext = cache => async operation => {
  if (typeof environment === 'undefined') {
    environment = {
      ...(await getParityProvider(nextConfig.jsonRpcEndpoint)),
      track: nextConfig.track,
      account: {
        address: '0x12BcF5de4cbE5199e1A1e4746FA9046124343F8C',
      },
    };

    config = await getConfig(environment);
    network = await environment.api.net.version();
  }

  return {
    environment,
    network,
    config,
    loaders: {
      ethereumNetwork: () => network,
      currentBlock: R.memoizeWith(R.identity, () => {
        return Promise.race([
          new Promise(resolve => {
            // If we can't determine the current block within
            // 500ms, assume that we are out of date.
            setTimeout(() => resolve(null), 500);
          }),
          environment.api.eth.blockNumber(),
        ]);
      }),
      etherBalance: R.memoizeWith(R.identity, async address => {
        const balance = await environment.api.eth.getBalance(address);
        return toReadable(config, balance, config.nativeAssetSymbol);
      }),
      melonBalance: R.memoizeWith(R.identity, async address => {
        return getBalance(environment, {
          tokenSymbol: config.melonAssetSymbol,
          ofAddress: address,
        });
      }),
      nativeBalance: R.memoizeWith(R.identity, async address => {
        return getBalance(environment, {
          tokenSymbol: config.nativeAssetSymbol,
          ofAddress: address,
        });
      }),
      isSyncing: R.memoizeWith(R.identity, async () => {
        const syncing = await environment.api.eth.syncing();
        return syncing ? !!syncing.result : syncing;
      }),
      isDataValid: R.memoizeWith(R.identity, () => {
        return hasRecentPrice(environment);
      }),
      accountAddress: R.memoizeWith(R.identity, () => {
        return getAccountAddress(environment);
      }),
      getMnemonic: R.memoizeWith(R.identity, () => {
        return createWallet().mnemonic;
      }),
      storeWallet: R.memoizeWith(R.identity, async values => {
        const wallet = importWalletFromMnemonic(values.mnemonic);
        const encryptedWalletString = await encryptWallet(
          wallet,
          values.password,
        );
        localStorage.setItem('wallet:melon.fund', encryptedWalletString);
      }),
      getParticipation: R.memoizeWith(
        (fund, investor) => {
          return `${fund}:${investor}`;
        },
        (fund, investor) => {
          return getParticipation(environment, {
            fundAddress: fund,
            investorAddress: investor,
          });
        },
      ),
    },
  };
};
