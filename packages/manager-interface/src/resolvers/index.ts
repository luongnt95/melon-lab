import { getParityProvider } from '@melonproject/melon.js';
import * as R from 'ramda';
import ethereumNetwork from './etherumNetwork';
import rankingOrdering from './rankingOrdering';
import rankingSearchString from './rankingSearchString';
import currentUser from './currentUser';
import personalStake from './personalStake';

export const defaults = {
  ethereumNetwork: null,
  rankingOrdering: '+rank',
  rankingSearchString: '',
  currentUser: {
    __typename: 'User',
    ethereumAddress: '0xa80B5F4103C8d027b2ba88bE9Ed9Bb009bF3d46f' ,
  },
};

export const resolvers = R.reduce(R.mergeDeepLeft, {})([
  ethereumNetwork,
  rankingOrdering,
  rankingSearchString,
  currentUser,
  personalStake,
]);

let environment;
export const withContext = cache => async operation => {
  if (typeof environment === 'undefined') {
    const endpoint = global.JSON_RPC_ENDPOINT || process.env.JSON_RPC_ENDPOINT;
    const track = global.TRACK || process.env.TRACK;
    environment = {
      ...(await getParityProvider(endpoint)),
      track,
    };
  }

  return {
    environment,
  };
};
