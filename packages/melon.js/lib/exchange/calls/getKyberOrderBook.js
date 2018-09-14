// @flow
import BigNumber from 'bignumber.js';
import { range } from 'ramda';
import getOrder from './getOrder';
import getConversionRate from './getConversionRate';
import getKyberProxyContract from '../contracts/getKyberProxyContract'
import getConfig from '../../version/calls/getConfig';

import type { Order } from '../schemas/Order';

/**
 * Get `numberOfOrders` active orders for the `baseTokenSymbol`/
 * `quoteTokenSymbol` asset pair
 */
const getKyberOrderBook = async (
  environment,
  { baseTokenSymbol, quoteTokenSymbol, progression = 1, depth = 5 },
) => {
  const rates = []
  const config = await getConfig(environment);
  for (let i = 0; i < depth; i++) {
    const [, slippageRate] = await getConversionRate(environment, { srcTokenSymbol: baseTokenSymbol, destTokenSymbol: quoteTokenSymbol, srcAmount: progression * i });
    rates.push(slippageRate);
  }
  return rates;
};

export default getKyberOrderBook;
