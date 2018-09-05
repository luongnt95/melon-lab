import { getPrice } from '@melonproject/melon.js';

async function price(parent, args, context) {
  return getPrice(context.environment, args.symbol);
}

export default price;
