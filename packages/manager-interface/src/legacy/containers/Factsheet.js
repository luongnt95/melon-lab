import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Factsheet from '@melonproject/manager-components/components/Factsheet';
import { actions as appActions } from '../actions/app';
import { actions as administrationActions } from '../actions/administration';
import { networks } from '@melonproject/melon.js';
import { track, isCompetition } from '~/legacy/utils/track';

const mapStateToProps = (state, props) => ({
  creationDate:
    props.inception && moment(props.inception).format('D. MMM YYYY HH:mm'),
  personalStake: state.fund.personalStake,
  dataValid: state.ethereum.isDataValid,
  numberOfFunds: state.fund.numberOfFunds,
  quoteAsset: state.app.assetPair.quote,
  reportUrl: `https://${
    state.ethereum.network === networks.KOVAN ? 'melon' : 'olympiad'
  }-reporting.now.sh/report/${props.address}`,
  account: state.ethereum.account,
  track,
  isCompetition,
});

const mapDispatchToProps = dispatch => ({
  scrollTo: target => dispatch(appActions.scrollTo(target)),
  shutdown: () => dispatch(administrationActions.shutdown()),
});

const withState = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withState)(Factsheet);
