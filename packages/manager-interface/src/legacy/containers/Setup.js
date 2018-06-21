import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Setup from '../components/organisms/Setup';
import { actions } from '../actions/fund';

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress,
  networkId: state.ethereum.network,
  config: state.fund.config,
  isCompetition: state.app.isCompetition,
});

const onSubmit = (values, dispatch) => {
  dispatch(actions.setupRequested(values.name, true, true));
};

const SetupRedux = connect(mapStateToProps)(Setup);

const SetupForm = reduxForm({
  form: 'setup',
  onSubmit,
})(SetupRedux);

export default SetupForm;
