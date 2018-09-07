import moment from 'moment';
// import { connect } from 'react-redux';
import { compose, withPropsOnChange } from 'recompose';
import FactSheet from '~/components/Factsheet';
import displayNumber from '~/utils/displayNumber';
// import { actions as appActions } from '../actions/app';
// import { actions as administrationActions } from '../actions/administration';
// import { networks } from '@melonproject/melon.js';
// import { track, isCompetition } from '~/legacy/utils/track';

// const mapStateToProps = (state, props) => ({
//   dataValid: state.ethereum.isDataValid,
//   reportUrl: `https://${
//     state.ethereum.network === networks.KOVAN ? 'melon' : 'olympiad'
//   }-reporting.now.sh/report/${props.address}`,
//   account: state.ethereum.account,
//   track,
//   isCompetition,
// });

// const mapDispatchToProps = dispatch => ({
//   scrollTo: target => dispatch(appActions.scrollTo(target)),
//   shutdown: () => dispatch(administrationActions.shutdown()),
// });

// const withState = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

const withMappedProps = withPropsOnChange(['personalStake', 'inception'], (props) => ({
  creationDate: props.inception && moment(props.inception).format('D. MMM YYYY HH:mm'),
  personalStake: props.personalStake && displayNumber(props.personalStake),
}));

export default compose(
  withMappedProps,
)(FactSheet);
