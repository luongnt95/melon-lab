import { withFormik } from 'formik';
import { compose, withState } from 'recompose';
import * as Yup from 'yup';
import GenerateWallet from './index';

const withGenerateWalletState = withState('showForm', 'setShowForm', false);

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  validationSchema: Yup.object().shape({
    mnemonic: Yup.string().required('mnemonic is required.'),
    password: Yup.string().required('password is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

export default compose(
  withGenerateWalletState,
  withFormValidation,
)(GenerateWallet);
