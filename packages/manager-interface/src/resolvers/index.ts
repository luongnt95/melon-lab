import { getParityProvider } from '@melonproject/melon.js';
import * as R from 'ramda';
import ethereumNetwork from './etherumNetwork';
import rankingOrdering from './rankingOrdering';
import rankingSearchString from './rankingSearchString';

export const defaults = {
  ethereumNetwork: null,
  rankingOrdering: '+rank',
  rankingSearchString: '',
};

export const resolvers = R.reduce(R.mergeDeepLeft, {})([
  ethereumNetwork,
  rankingOrdering,
  rankingSearchString
]);

let environment;
let network;

export const withContext = cache => async operation => {
  if (typeof environment !== 'undefined' && typeof network !== 'undefined') {
    const endpoint = global.JSON_RPC_ENDPOINT || process.env.JSON_RPC_ENDPOINT;
    environment = await getParityProvider(endpoint);
    network = await environment.api.net.version();
  }

  return {
    environment,
    network,
  };
};
