import axios from 'axios';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import formatRelayerOrderbook from '../../formatRelayerOrderbook';

// Isomorphic websocket implementation. Falls back to the standard browser
// protocol on the client.
import WebSocket = require('isomorphic-ws');

const debug = require('debug')('exchange-aggregator:erc-dex');

const fetchOrderbook = async (baseTokenAddress, quoteTokenAddress, network) => {
  const endpoint =
    network === 'KOVAN'
      ? 'https://api.ercdex.com/api/standard/42/v0/orderbook'
      : 'https://api.ercdex.com/api/standard/1/v0/orderbook';
  const params = {
    baseTokenAddress,
    quoteTokenAddress,
  };

  debug('Fetching orderbook', params, endpoint);

  const data = await axios.get(endpoint, {
    params,
  });

  debug('Fetched orderbook', data.data);

  return data.data;
};

const getObservableErcDexNotifications = (
  baseTokenAddress,
  quoteTokenAddress,
) => {
  const channel = `aggregated-order-feed/${baseTokenAddress}/${quoteTokenAddress}`;

  debug('Connecting to websocket.', channel);

  const open$ = new Rx.Subject();
  const close$ = new Rx.Subject();
  const socket$ = Rx.Observable.webSocket({
    url: 'wss://api.ercdex.com',
    WebSocketCtor: WebSocket,
    openObserver: open$,
    closeObserver: close$,
  });

  open$.subscribe(event => {
    socket$.next(`sub:${channel}`);

    Rx.Observable.interval(5000)
      .takeUntil(close$)
      .subscribe(() => socket$.next('tick'));
  });

  const messages$ = socket$
    .retry()
    .filter(R.propEq('channel', channel))
    .do(value => debug(`Received update notification.`, value));

  return messages$;
};

const getObservableErcDex = (
  baseTokenAddress,
  quoteTokenAddress,
  network,
  config,
) => {
  const format = formatRelayerOrderbook('ERC_DEX');

  const fetch$ = Rx.Observable.defer(() =>
    fetchOrderbook(baseTokenAddress, quoteTokenAddress, network),
  );

  const orderbook$ = fetch$
    .distinctUntilChanged()
    .do(value => debug('Extracting bids and asks.', value))
    .map(value => format(config, value.bids, value.asks));

  return orderbook$.repeatWhen(() =>
    getObservableErcDexNotifications(baseTokenAddress, quoteTokenAddress),
  );
};

export default getObservableErcDex;
