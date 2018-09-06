import { connect } from 'react-redux';
import { actions } from '../actions/trade';
import OrderForm from '@melonproject/manager-components/components/OrderForm/container';
import isSameAddress from '../utils/isSameAddress';
import displayNumber from '../utils/displayNumber';
import { compose, withPropsOnChange } from 'recompose';

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
    exchanges: [
      { value: 'RADAR_RELAY', name: 'Radar Relay' },
      { value: 'OASIS_DEX', name: 'OasisDEX' },
    ],
    decimals: 4,
    dataValid: state.ethereum.isDataValid,
    recentTrades: state.recentTrades,
  };
};

const withState = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withMappedOrders = withPropsOnChange(['holdings'], props => ({
  info: {
    lastPrice:
      props.recentTrades.trades.length &&
      displayNumber(
        props.recentTrades.trades[props.recentTrades.trades.length - 1].price,
      ),
    // TODO: bid and ask
    // bid:
    //   state.orderbook.buyOrders.length &&
    //   displayNumber(state.orderbook.buyOrders[0].price),
    // ask:
    //   state.orderbook.sellOrders.length &&
    //   displayNumber(state.orderbook.sellOrders[0].price),
    tokens: {
      baseToken: {
        name: props.baseTokenSymbol,
        balance: props.holdings.length
          ? props.holdings
              .find(a => a.symbol === props.baseTokenSymbol)
              .balance.toString(10)
          : undefined,
      },
      quoteToken: {
        name: props.quoteTokenSymbol,
        balance: props.holdings.length
          ? props.holdings
              .find(a => a.symbol === props.quoteTokenSymbol)
              .balance.toString(10)
          : undefined,
      },
    },
  },
}));

export default compose(
  withState,
  withMappedOrders,
)(OrderForm);
