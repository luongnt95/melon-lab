export const types = {
  FILL: 'FILL:trade:melon.fund',
  PLACE_ORDER_REQUESTED: 'PLACE_ORDER_REQUESTED:trade:melon.fund',
  PLACE_ORDER_SUCCEEDED: 'PLACE_ORDER_SUCCEEDED:trade:melon.fund',
  PLACE_ORDER_FAILED: 'PLACE_ORDER_FAILED:trade:melon.fund',
  TAKE_ORDER_REQUESTED: 'TAKE_ORDER_REQUESTED:trade:melon.fund',
  TAKE_ORDER_SUCCEEDED: 'TAKE_ORDER_SUCCEEDED:trade:melon.fund',
  TAKE_ORDER_FAILED: 'TAKE_ORDER_FAILED:trade:melon.fund',
};

export const actions = {
  fill: ({ orderType, exchange, price, quantity, total, strategy }) => ({
    type: types.FILL,
    orderType,
    exchange,
    price,
    quantity,
    total,
    strategy,
  }),
  placeOrder: values => ({
    type: types.PLACE_ORDER_REQUESTED,
    values,
  }),
  placeOrderFailed: reason => ({
    type: types.PLACE_ORDER_FAILED,
    reason,
  }),
  placeOrderSucceeded: () => ({
    type: types.PLACE_ORDER_SUCCEEDED,
  }),
  takeOrder: values => ({
    type: types.TAKE_ORDER_REQUESTED,
    values,
  }),
  takeOrderFailed: reason => ({
    type: types.TAKE_ORDER_FAILED,
    reason,
  }),
  takeOrderSucceeded: () => ({
    type: types.TAKE_ORDER_SUCCEEDED,
  }),
};
