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
