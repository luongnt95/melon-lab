import moment from 'moment';
import { connect } from 'react-redux';
import ClaimReward from '@melonproject/manager-components/components/ClaimReward';
import { actions } from '../actions/participation';

const mapStateToProps = state => ({
  isCompetitionActive: state.fund.isParosActive,
  endTime:
    state.fund.parosEndTime && state.fund.parosEndTime !== '...'
      ? moment(state.fund.parosEndTime * 1000).format('D. MMM YYYY HH:mm')
      : '...',
});

const mapDispatchToProps = dispatch => ({
  claimReward: () => {
    dispatch(actions.claimReward());
  },
  redeemParosShares: () => {
    dispatch(actions.redeemParosShares());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClaimReward);
