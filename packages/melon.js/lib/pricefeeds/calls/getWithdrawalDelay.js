// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import type { Environment } from '../../utils/environment/Environment';

/**
 * Gets the quote asset of the current PriceFeed
 */
const getWithdrawalDelay = async (
  environment: Environment,
): Promise<TokenSymbol> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.withdrawalDelay.call();
};

export default getWithdrawalDelay;
