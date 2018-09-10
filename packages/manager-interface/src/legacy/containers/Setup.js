import { connect } from 'react-redux';
import Setup from '@melonproject/manager-components/components/Setup/container';
import { actions } from '../actions/fund';
// import { isCompetition } from '~/legacy/utils/track';

const mapStateToProps = state => ({
  initialValues: {
    name: '',
  },
  loading: state.app.transactionInProgress,
  networkId: state.ethereum.network,
  config: state.fund.config,
  // isCompetition,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    dispatch(actions.setupRequested(values.name, true, true));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setup);
