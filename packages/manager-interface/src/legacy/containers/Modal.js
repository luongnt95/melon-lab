import * as R from 'ramda';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import Modal from '../components/pages/Modal';
import { actions, interactions } from '../actions/modal';
import { getEnvironment, setEnvironment } from '@melonproject/melon.js';

const mapStateToProps = state => ({
  ...state.modal,
  gasPrice: R.pathOr(20, ['form', 'modal', 'values', 'gasPrice'], state),
  type: state.modal.modalType,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  interactionHandler: (event, interaction) => {
    // Hint: Submit is handled by the form, not as action. But we need to
    // prevent form submitting for the other actions.

    if (interaction === interactions.CANCEL) {
      event.preventDefault();
      dispatch(actions.cancel());
    }
  },
  onAfterOpen: () => {
    ownProps.reset();
  },
});

const onSubmit = async (values, dispatch) => {
  if (values.gasPrice !== undefined && !values.password) {
    event.preventDefault();
    dispatch(actions.confirmed(values.gasPrice * 10 ** 9));
  } else if (values.password) {
    dispatch(actions.passwordEntered(values.password));
    dispatch(reset('modal'));
  } else {
    dispatch(actions.confirmed());
  }
};

const ModalRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);

const ModalForm = reduxForm({
  form: 'modal',
  onSubmit,
})(ModalRedux);

export default ModalForm;
