import MatchingMarketAdapterAbi from '@melonproject/smart-contracts/out/exchange/adapter/MatchingMarketAdapter.abi.json';

import getConfig from '../../version/calls/getConfig';

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getMatchingMarketAdapter = async environment => {
  const config = await getConfig(environment);

  return environment.api.newContract(
    MatchingMarketAdapterAbi,
    config.matchingMarketAdapter,
  );
};

export default getMatchingMarketAdapter;
