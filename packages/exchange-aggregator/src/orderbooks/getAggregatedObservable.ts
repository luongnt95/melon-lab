import * as R from 'ramda';
import * as Rx from 'rxjs';
import getObservableErcDex from './ercDex/getObservableErcDex';
import getObservableOasisDex from './oasisDex/getObservableOasisDex';
import getObservableRadarRelay from './radarRelay/getObservableRadarRelay';

import { ExchangeEnum, NetworkEnum, Order } from '../index';

const debug = require('debug')('exchange-aggregator');

export type ExchangeCreator = (
  baseTokenAddress: string,
  quoteTokenAddress: string,
  network: NetworkEnum,
  environment: any,
  config: any,
) => Rx.Observable<Order[]>;

const exchangeToCreatorFunction: { [P in ExchangeEnum]: ExchangeCreator } = {
  RADAR_RELAY: (
    baseTokenAddress,
    quoteTokenAddress,
    network,
    environment,
    config,
  ) =>
    getObservableRadarRelay(baseTokenAddress, quoteTokenAddress, network, config),
  OASIS_DEX: (
    baseTokenAddress,
    quoteTokenAddress,
    network,
    environment,
    config,
  ) =>
    getObservableOasisDex(
      baseTokenAddress,
      quoteTokenAddress,
      environment,
      config,
    ),
  ERC_DEX: (baseTokenAddress, quoteTokenAddress, network, environment, config) =>
    getObservableErcDex(baseTokenAddress, quoteTokenAddress, network, config),
};

const concatOrderbooks = R.reduce<Order[], Order[]>(R.concat, []);

const sortOrderBooks = R.sort<Order>((a, b) => {
  if (a.type === b.type) {
    if (a.type === 'buy') {
      return b.price.minus(a.price).toNumber();
    }

    if (a.type === 'sell') {
      return a.price.minus(b.price).toNumber();
    }
  }

  return a.type === 'buy' ? 1 : -1;
});

const getAggregatedObservable = (
  baseTokenAddress: string,
  quoteTokenAddress: string,
  exchanges: ExchangeEnum[] = ['RADAR_RELAY', 'OASIS_DEX', 'ERC_DEX'],
  network: NetworkEnum = 'KOVAN',
  environment,
  config,
) => {
  const exchanges$ = Rx.Observable.from<ExchangeEnum>(exchanges);
  const orderbooks$ = exchanges$
    .map(name => exchangeToCreatorFunction[name])
    .map(create =>
      create(baseTokenAddress, quoteTokenAddress, network, environment, config),
  )
    .combineAll<Rx.Observable<Order[]>, Order[][]>()
    .do(value => debug('Emitting combined order book.', value))
    .distinctUntilChanged(R.equals);

  // Concat and sort orders across all order books.
  return orderbooks$.map(
    R.compose(
      sortOrderBooks,
      concatOrderbooks,
    ),
  );
};

export default getAggregatedObservable;
