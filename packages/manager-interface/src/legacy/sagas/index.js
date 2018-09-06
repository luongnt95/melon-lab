import { fork } from 'redux-saga/effects';

import administration from './administration';
import app from './app';
import ethereum from './ethereum';
import fund from './fund';
import orderbook from './orderbook';
import participation from './participation';
import recentTrades from './recentTrades';
import setup from './setup';
import trade from './trade';
import wallet from './wallet';

function* rootSaga() {
  yield fork(administration);
  yield fork(app);
  yield fork(ethereum);
  yield fork(fund);
  yield fork(orderbook);
  yield fork(participation);
  yield fork(recentTrades);
  yield fork(setup);
  yield fork(trade);
  yield fork(wallet);
}

export default rootSaga;
