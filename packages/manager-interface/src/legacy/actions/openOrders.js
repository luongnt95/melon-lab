export const types = {
  CANCEL_ORDER_REQUESTED: 'CANCEL_ORDER_REQUESTED:openOrders:melon.fund',
  CANCEL_ORDER_SUCCEEDED: 'CANCEL_ORDER_SUCCEEDED:openOrders:melon.fund',
  CANCEL_ORDER_FAILED: 'CANCEL_ORDER_FAILED:openOrders:melon.fund',
};

export const actions = {
  cancelOrder: (orderId, makerAssetSymbol, takerAssetSymbol) => ({
    type: types.CANCEL_ORDER_REQUESTED,
    orderId,
    makerAssetSymbol,
    takerAssetSymbol,
  }),
  cancelOrderFailed: reason => ({
    type: types.CANCEL_ORDER_FAILED,
    reason,
  }),
  cancelOrderSucceeded: () => ({
    type: types.CANCEL_ORDER_SUCCEEDED,
  }),
};
