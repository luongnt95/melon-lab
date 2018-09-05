import { takeLatest, call, put, select, take } from 'redux-saga/effects';
import {
  getOpenOrders,
  cancelOrder,
  getEnvironment,
} from '@melonproject/melon.js';
import { actions, types } from '../actions/openOrders';
import { types as ethereumTypes } from '../actions/ethereum';
import { actions as modalActions } from '../actions/modal';
import signer from './signer';

function* cancelOrderSaga({ orderId, makerAssetSymbol, takerAssetSymbol }) {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  const fundAddress = yield select(state => state.fund.address);
  function* transaction(environment) {
    yield call(cancelOrder, environment, {
      identifier: orderId,
      fundAddress,
      makerAssetSymbol,
      takerAssetSymbol,
    });
    yield put(actions.cancelOrderSucceeded());
    yield put(modalActions.close());

    // TODO: Remove entry from apollo (or refetch).
  }

  yield call(
    signer,
    `Do you really want to cancel the following limit order #${orderId} ?`,
    transaction,
    actions.cancelOrderFailed,
  );
}

function* openOrders() {
  yield takeLatest(types.CANCEL_ORDER_REQUESTED, cancelOrderSaga);
  yield takeLatest(types.CANCEL_ORDER_SUCCEEDED, getOpenOrdersSaga);
}

export default openOrders;
