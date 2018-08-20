import * as R from 'ramda';
import { connect } from 'react-redux';
import FeeForm from '@melonproject/manager-components/components/FeeForm/container';
import { actions } from '../actions/modal';

const mapStateToProps = state => ({
  initialValues: {
    gasPrice: R.pathOr(20, ['form', 'modal', 'values', 'gasPrice'], state),
  },
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    dispatch(actions.confirmed(values.gasPrice * 10 ** 9));
  },
  onCancel: () => {
    dispatch(actions.cancel());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeeForm);
