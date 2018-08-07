import { connect } from 'react-redux';
import { actions } from '../actions/administration';
import { actions as routeActions } from '../actions/routes';
import Administration from '../components/organisms/Administration';

const mapStateToProps = state => ({
  subscriptionAllowed: state.fund.subscriptionAllowed,
  loading: state.app.transactionInProgress,
  fundAddress: state.fund.address,
  isCompeting: state.fund.isCompeting,
  quoteAsset: state.app.assetPair.quote,
});

const mapDispatchToProps = dispatch => ({
  registerForCompetition: fundAddress =>
    dispatch(routeActions.competition(fundAddress)),
  toggleSubscription: () => dispatch(actions.toggleSubscription()),
  convertUnclaimedRewards: () => dispatch(actions.convertUnclaimedRewards()),
  shutdown: () => dispatch(actions.shutdown()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Administration);
