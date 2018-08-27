import moment from 'moment';
import { connect } from 'react-redux';
import ClaimReward from '@melonproject/manager-components/components/ClaimReward';
import { actions } from '../actions/participation';
import { networks } from '@melonproject/melon.js';

const mapStateToProps = state => ({
  isCompetitionActive: state.fund.isParosActive,
  endTime:
    state.fund.parosEndTime && state.fund.parosEndTime !== '...'
      ? moment(state.fund.parosEndTime * 1000).format('D. MMM YYYY HH:mm')
      : '...',
  reportUrl: `https://${
    state.ethereum.network === networks.KOVAN ? 'melon' : 'olympiad'
  }-reporting.now.sh/report/${state.fund.address}`,
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
