export const types = {
  FILL: 'FILL:orderForm:melon.fund',
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
};
