import {
  getFundInformations,
  getHoldingsAndPrices,
  getRanking,
  performCalculations,
} from '@melonproject/melon.js';

import * as graphqlFields from 'graphql-fields';

const fundInfomationFields = [
  'fundAddress',
  'name',
  'owner',
  'decimals',
  'inception',
  'modules',
];

const calculationFields = [
  'holdings',
  'gav',
  'managementReward',
  'performanceReward',
  'unclaimedRewards',
  'rewardsShareQuantity',
  'nav',
  'sharePrice',
  'totalSupply',
];

const containsField = (fields, query) =>
  fields.find(field => query.includes(field));

async function funds(parent, args, context, info) {
  const ranking = await getRanking(context.environment);
  const fields = Object.keys(graphqlFields(info));
  const addresses = args.addresses || ranking.map(fund => fund.address);

  const promises = addresses.map(async fundAddress => {
    const rankingInfo =
      ranking.find(rank => rank.address === fundAddress) || {};

    const calculations = containsField(fields, calculationFields)
      ? await performCalculations(context.environment, {
          fundAddress,
        })
      : {};

    const informations = containsField(fields, fundInfomationFields)
      ? await getFundInformations(context.environment, {
          fundAddress,
        })
      : {};

    const holdings = fields.includes('holdings')
      ? await getHoldingsAndPrices(context.environment, {
          fundAddress,
        }).then(h =>
          h.map(holding => ({
            symbol: holding.name,
            price: holding.price,
            balance: holding.balance,
            fraction: holding.balance.eq(0)
              ? 0
              : calculations.nav.div(holding.balance.times(holding.price)),
          })),
        )
      : [];

    return {
      address: fundAddress,
      ...rankingInfo,
      ...calculations,
      ...informations,
      holdings,
    };
  });

  const result = await Promise.all(promises);

  return result;
};

export default funds;
