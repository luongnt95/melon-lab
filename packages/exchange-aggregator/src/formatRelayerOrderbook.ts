import { getPrices, getSymbol, toReadable } from '@melonproject/melon.js';

const formatRelayerOrderbook = exchange => (config, bids, asks) => {
  const formattedBids = bids.map(order => ({
    salt: order.salt,
    maker: order.maker,
    taker: order.taker,
    isActive: true,
    sell: {
      symbol: getSymbol(config, order.makerTokenAddress),
      howMuch: toReadable(
        config,
        order.makerTokenAmount,
        getSymbol(config, order.makerTokenAddress),
      ),
    },
    buy: {
      symbol: getSymbol(config, order.takerTokenAddress),
      howMuch: toReadable(
        config,
        order.takerTokenAmount,
        getSymbol(config, order.takerTokenAddress),
      ),
    },
    type: 'buy',
    makerFee: order.makerFee,
    takerFee: order.takerFee,
    signature: order.ecSignature,
    expiration: order.expirationUnixTimestampSec,
    feeRecipient: order.feeRecipient,
    exchangeContractAddress: order.exchangeContractAddress,
    exchange,
  }));
  const formattedAsks = asks.map(order => ({
    salt: order.salt,
    maker: order.maker,
    taker: order.taker,
    isActive: true,
    sell: {
      symbol: getSymbol(config, order.makerTokenAddress),
      howMuch: toReadable(
        config,
        order.makerTokenAmount,
        getSymbol(config, order.makerTokenAddress),
      ),
    },
    buy: {
      symbol: getSymbol(config, order.takerTokenAddress),
      howMuch: toReadable(
        config,
        order.takerTokenAmount,
        getSymbol(config, order.takerTokenAddress),
      ),
    },
    type: 'sell',
    makerFee: order.makerFee,
    takerFee: order.takerFee,
    signature: order.ecSignature,
    expiration: order.expirationUnixTimestampSec,
    feeRecipient: order.feeRecipient,
    exchangeContractAddress: order.exchangeContractAddress,
    exchange,
  }));

  const orderbook = [...formattedBids, ...formattedAsks].map(order => ({
    ...order,
    price: order.type === 'buy' ? getPrices(order).buy : getPrices(order).sell,
  }));

  return orderbook;
};

export default formatRelayerOrderbook;
