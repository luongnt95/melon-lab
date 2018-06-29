import { getOrderbook, getSymbol } from '@melonproject/melon.js';
import * as R from 'ramda';
import * as Rx from 'rxjs';

const debug = require('debug')('exchange-aggregator:oasis-dex');

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });
const labelOrders = orders => orders.map(labelOrder);

const getObservableOasisDex = (
  baseTokenAddress,
  quoteTokenAddress,
  environment,
  config,
) => {
  const baseTokenSymbol = getSymbol(config, baseTokenAddress);
  const quoteTokenSymbol = getSymbol(config, quoteTokenAddress);

  const orderbook$ = Rx.Observable.defer(() =>
    getOrderbook(environment, { baseTokenSymbol, quoteTokenSymbol }),
  )
    .do(value => debug('Receiving values.', value))
    .distinctUntilChanged(R.equals)
    .map(labelOrders)
    .do(value => debug('Emitting order book.', value));

  // Repeat once every minute.
  return orderbook$.repeatWhen(Rx.operators.delay(60000));
};

export default getObservableOasisDex;
