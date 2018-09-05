import { takeLatest, call, put, select, take } from 'redux-saga/effects';
import {
  getOrderbook,
  deserializeOrder,
  averagePrice,
  getEnvironment,
} from '@melonproject/melon.js';
import { types, actions } from '../actions/orderbook';
import { types as ethereumTypes } from '../actions/ethereum';
import { actions as tradeActions } from '../actions/trade';
import { min } from '../utils/functionalBigNumber';

function* selectOrderSaga(action) {
  const ordersSubset = action.selectedOrders.map(element => ({
    ...element['order'],
    cumulativeVolume: element.volume,
  }));
  const selectedOrder = deserializeOrder({
    ...action.selectedOrders[action.selectedOrders.length - 1]['order'],
    cumulativeVolume:
      action.selectedOrders[action.selectedOrders.length - 1]['volume'],
  });

  const sellTokenSymbol = selectedOrder.buy.symbol;
  const sellTokenBalance = yield select(
    state =>
      state.holdings.holdings.find(h => h.name === sellTokenSymbol).balance,
  );

  try {
    let index;
    let subsetOfOrders;
    let orderType;
    let amount;
    let price;
    let total;
    let exchange;

    if (selectedOrder.type === 'buy') {
      orderType = 'Sell';
      const deserializedBuyOrders = ordersSubset.map(order =>
        deserializeOrder(order),
      );
      price = averagePrice('buy', deserializedBuyOrders);
      amount = min(sellTokenBalance, selectedOrder.cumulativeVolume);
      total = price.times(amount);
    } else if (selectedOrder.type === 'sell') {
      orderType = 'Buy';
      const deserializedSellOrders = ordersSubset.map(order =>
        deserializeOrder(order),
      );
      price = averagePrice('sell', deserializedSellOrders);
      total = min(
        sellTokenBalance,
        price.times(selectedOrder.cumulativeVolume),
      );
      amount = total.div(price);
    }

    exchange = selectedOrder.exchange;

    yield put(
      tradeActions.fill({
        strategy: 'Market',
        quantity: amount.toString(),
        total: total.toString(),
        price: price.toString(),
        orderType,
        exchange,
      }),
    );
  } catch (err) {
    console.error(err);
  }
}

function* orderbook() {
  yield takeLatest(types.SELECT_ORDER, selectOrderSaga);
}

export default orderbook;
