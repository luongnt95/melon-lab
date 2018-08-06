import moment from 'moment';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { actions } from '../actions/recentTrades';
import RecentTrades from '@melonproject/manager-components/components/RecentTrades';
import displayNumber from '../utils/displayNumber';

const mapStateToProps = state => ({
  ...state.recentTrades,
  trades: state.recentTrades.trades.map(trade => ({
    price: displayNumber(trade.price),
    quantity: displayNumber(trade.quantity),
    timestamp: moment(trade.timestamp).format('D. MMM YYYY HH:mm'),
    type: trade.type,
  })),
  baseTokenSymbol: state.app.assetPair.base,
  quoteTokenSymbol: state.app.assetPair.quote,
});

const mapDispatchToProps = dispatch => ({
  getRecentTrades: () => {
    dispatch(actions.getRecentTrades());
  },
});

const RecentTradesWithLifecycle = lifecycle({
  componentDidMount() {
    this.props.getRecentTrades();
  },
})(RecentTrades);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentTradesWithLifecycle);
