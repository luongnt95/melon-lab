import { getParityProvider } from '@melonproject/melon.js';
import * as R from 'ramda';
import ethereumNetwork from './etherumNetwork';
import currentUser from './currentUser';
import personalStake from './personalStake';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

export const defaults = {
  ethereumNetwork: null,
  currentUser: {
    __typename: 'User',
    ethereumAddress: '0xa80B5F4103C8d027b2ba88bE9Ed9Bb009bF3d46f' ,
  },
};

export const resolvers = R.reduce(R.mergeDeepLeft, {})([
  ethereumNetwork,
  currentUser,
  personalStake,
]);

let environment;
export const withContext = cache => async operation => {
  if (typeof environment === 'undefined') {
    environment = {
      ...(await getParityProvider(config.jsonRpcEndpoint)),
      track: config.track,
    };
  }

  return {
    environment,
  };
};
