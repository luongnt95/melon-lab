export const types = {
  SELECT_ORDER: 'SELECT_ORDER:orderbook:melon.fund',
};

export const actions = {
  selectOrder: selectedOrders => ({
    type: types.SELECT_ORDER,
    selectedOrders,
    selectedOrder: selectedOrders[selectedOrders.length - 1].order,
  }),
};
