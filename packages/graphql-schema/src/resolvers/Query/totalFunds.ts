import { getRanking } from '@melonproject/melon.js';

async function totalFunds(parent, args, context, info) {
  const ranking = await getRanking(context.environment);
  return ranking && ranking.length || 0;
}

export default totalFunds;
