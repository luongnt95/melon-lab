import { take, put, takeLatest, select, apply, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
  getConfig,
  onBlock,
  getParityProvider,
  providers,
  networks,
  setEnvironment,
  getEnvironment,
} from '@melonproject/melon.js';
import { utils } from 'ethers';

import { types as browserTypes } from '../actions/browser';
import { actions as appActions } from '../actions/app';
import { actions as ethereumActions } from '../actions/ethereum';
import { actions as modalActions } from '../actions/modal';
import { actions as fundActions } from '../actions/fund';
import { equals } from '../utils/functionalBigNumber';

const BLOCK_POLLING_INTERVAL = 4 * 1000;
const MAX_INTERVAL_BETWEEN_BLOCKS = 5;

function* init() {
  const environment = yield call(
    getParityProvider,
    global.JSON_RPC_ENDPOINT || process.env.JSON_RPC_ENDPOINT,
  );

  const networkId = yield apply(environment.api, environment.api.net.version);
  const track = yield select(state => state.app.track);

  if (track === 'live' && networkId !== networks.LIVE) {
    yield put(
      modalActions.fatal('Your parity-node seems to not run on the main net.'),
    );
    console.error(
      'Wrong track/network combination',
      { track, networkId },
      environment,
    );
    return false;
  } else if (track !== 'live' && networkId !== networks.KOVAN) {
    yield put(modalActions.fatal('Your parity-node seems to not run on kovan'));
    console.error(
      'Wrong track/network combination',
      { track, networkId },
      environment,
    );
    return false;
  }

  // TODO: add tracer
  environment.track = track;
  setEnvironment(environment);
  yield put(ethereumActions.setProvider(environment.providerType));
  const config = yield call(getConfig, environment);

  global.MELON_PROTOCOL_CONFIG = config;
  yield put(fundActions.setConfig(config));
  yield put(
    appActions.updateAssetPair({
      base: config.melonAssetSymbol,
      quote: config.quoteAssetSymbol,
    }),
  );

  // Reading the fund address from the URL
  const fund = yield select(state => state.fund);

  yield put(ethereumActions.hasConnected(networkId));

  if (fund.address !== '' && fund.name === '-') {
    yield put(fundActions.infoRequested(fund.address));
  }

  const blockChannel = eventChannel(emitter => {
    let lastBlockNumber;
    let intervalsSinceLastBlock = 0;

    const pollBlock = async () => {
      try {
        const blockNumber = await environment.api.eth.blockNumber();

        if (!equals(blockNumber, lastBlockNumber)) {
          const environment = getEnvironment();
          const data = await onBlock(environment);
          emitter({ onBlock: { ...data, blockNumber } });
          lastBlockNumber = blockNumber;
          intervalsSinceLastBlock = 0;
        } else {
          intervalsSinceLastBlock += 1;
        }

        if (intervalsSinceLastBlock > MAX_INTERVAL_BETWEEN_BLOCKS) {
          emitter({ blockOverdue: true });
        }
      } catch (e) {
        emitter({ blockError: true });
        console.error(e);
      }
    };

    pollBlock();
    const blockInterval = setInterval(pollBlock, BLOCK_POLLING_INTERVAL);

    return () => {
      clearInterval(blockInterval);
    };
  });

  while (true) {
    const data = yield take(blockChannel);
    if (data.onBlock) {
      yield put(
        ethereumActions.newBlock({
          ...data.onBlock,
          ethBalance: data.onBlock.etherBalance,
          mlnBalance: data.onBlock.melonBalance,
        }),
      );
    } else if (data.blockOverdue) {
      yield put(ethereumActions.blockOverdue());
    } else {
      yield put(ethereumActions.blockError());
    }
  }
}

function* ethereum() {
  yield takeLatest(browserTypes.LOADED, init);
}

export default ethereum;
