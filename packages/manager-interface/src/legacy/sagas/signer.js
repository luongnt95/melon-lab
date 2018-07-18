import { call, put, take, select, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import {
  getEnvironment,
  getWallet,
  isExternalSigner,
} from '@melonproject/melon.js';

import { actions as modalActions, types as modalTypes } from '../actions/modal';

/*
  The confirmer attaches itself to the environment. Then, on every
  sendTransaction, the confirmer as awaited if present. One transaction
  can have multiple sendTransactions (i.e. approve, send, ...). Multiple
  sendTransactions leads to multiple confirm popups.
*/
function* confirmer(environment, modalSentence) {
  const confirmChannel = eventChannel(emitter => {
    environment.confirmer = (method, fees) =>
      new Promise(resolve => {
        emitter({ fees, resolve, method });
      });

    return () => emitter(END);
  });

  while (true) {
    const { fees, resolve, method } = yield take(confirmChannel);
    yield put(
      modalActions.confirm({
        body: modalSentence,
        fees,
        method,
      }),
    );

    const action = yield take([modalTypes.CONFIRMED, modalTypes.CANCEL]);

    if (action.type === modalTypes.CANCEL) {
      resolve(false);
    }

    yield put(modalActions.loading());

    resolve({ gasPrice: action.gasPrice });
  }
}

function* signer(modalSentence, transaction, failureAction) {
  try {
    const environment = getEnvironment();
    yield put(modalActions.loading());

    if (!isExternalSigner(environment)) {
      yield put(modalActions.loading());

      // The wallet gets attached to the environment for only this transaction
      // for security reasons
      const privateKey = yield select(state => state.wallet.privateKey);
      environment.account = getWallet(privateKey);

      yield fork(confirmer, environment, modalSentence);
    }
    yield call(transaction, environment);
  } catch (err) {
    if (err.name === 'EnsureError') {
      yield put(modalActions.error(err.message));
    } else {
      yield put(modalActions.error(err.message));
      console.error(err);
      console.log(JSON.stringify(err, null, 4));
    }
    yield put(failureAction(err));
  }
}

export default signer;
