import { connect } from 'react-redux';
import PasswordForm from '@melonproject/manager-components/components/PasswordForm/container';
import { actions } from '../actions/modal';

const mapStateToProps = state => ({
  initialValues: {
    password: '',
  },
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    dispatch(actions.passwordEntered(values.password));
  },
  onCancel: () => {
    dispatch(actions.cancel());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordForm);
