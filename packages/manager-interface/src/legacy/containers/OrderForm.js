import { connect } from 'react-redux';
import { actions } from '../actions/trade';
import OrderForm from '@melonproject/manager-components/components/OrderForm/container';
import isSameAddress from '../utils/isSameAddress';
import displayNumber from '../utils/displayNumber';

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    dispatch(actions.fill(values));
    if (values.strategy === 'Market') {
      dispatch(actions.takeOrder(values));
    } else {
      dispatch(actions.placeOrder(values));
    }
  },
});

const mapStateToProps = state => {
  const isManager =
    state.app.isReadyToInteract &&
    isSameAddress(state.ethereum.account, state.fund.owner);
  const isCompetition = state.app.isCompetition;

  return {
    isCompetition,
    isManager,
    baseTokenSymbol: state.app.assetPair.base,
    quoteTokenSymbol: state.app.assetPair.quote,
    values: state.trade,
    selectedOrder: state.orderbook.selectedOrder,
    info: {
      lastPrice:
        state.recentTrades.trades.length &&
        displayNumber(
          state.recentTrades.trades[state.recentTrades.trades.length - 1].price,
        ),
      // bid:
      //   state.orderbook.buyOrders.length &&
      //   displayNumber(state.orderbook.buyOrders[0].price),
      // ask:
      //   state.orderbook.sellOrders.length &&
      //   displayNumber(state.orderbook.sellOrders[0].price),
      tokens: {
        baseToken: {
          name: state.app.assetPair.base,
          balance: state.holdings.holdings.length
            ? state.holdings.holdings
                .find(a => a.name === state.app.assetPair.base)
                .balance.toString(10)
            : undefined,
        },
        quoteToken: {
          name: state.app.assetPair.quote,
          balance: state.holdings.holdings.length
            ? state.holdings.holdings
                .find(a => a.name === state.app.assetPair.quote)
                .balance.toString(10)
            : undefined,
        },
      },
    },
    exchanges: [
      { value: 'RADAR_RELAY', name: 'Radar Relay' },
      { value: 'OASIS_DEX', name: 'OasisDEX' },
    ],
    decimals: 4,
    dataValid: state.ethereum.isDataValid,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderForm);
