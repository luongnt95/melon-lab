import { connect } from 'react-redux';
import { reduxForm, change, formValueSelector } from 'redux-form';

import isSameAddress from '../utils/isSameAddress';
import Fund from '../components/pages/Fund';

const selector = formValueSelector('trade');

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.fund.loading,
    isVisitor: state.app.isReadyToVisit && !state.app.usersFund,
    isInvestor:
      state.app.isReadyToInteract &&
      !isSameAddress(state.ethereum.account, state.fund.owner),
    isManager:
      state.app.isReadyToInteract &&
      isSameAddress(state.ethereum.account, state.fund.owner),
    canInvest: state.app.isReadyToInteract,
    pendingRequest: state.fund.pendingRequest,
    // fundAddress: ownProps.match.params.fundAddress,
    isCompetition: state.app.isCompetition,
    orderForm: {
      baseTokenSymbol: state.app.assetPair.base,
      quoteTokenSymbol: state.app.assetPair.quote,
      selectedOrder: state.orderbook.selectedOrder,
      info: {
        lastPrice: state.recentTrades.trades.length
          ? displayNumber(
              state.recentTrades.trades[state.recentTrades.trades.length - 1]
                .price,
            )
          : 'N/A',
        bid: state.orderbook.buyOrders.length
          ? displayNumber(state.orderbook.buyOrders[0].price)
          : 'N/A',
        ask: state.orderbook.sellOrders.length
          ? displayNumber(state.orderbook.sellOrders[0].price)
          : 'N/A',
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
    },
  };
};

const FundContainer = connect(mapStateToProps)(Fund);

export default FundContainer;
