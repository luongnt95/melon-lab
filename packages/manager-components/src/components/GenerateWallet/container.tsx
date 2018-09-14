import { withFormik } from 'formik';
import { compose, withState } from 'recompose';
import * as Yup from 'yup';
import GenerateWallet from './index';

const withGenerateWalletState = withState('showForm', 'setShowForm', false);

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  validationSchema: props =>
    Yup.object().shape({
      mnemonic: Yup.string()
        .required('Mnemonic is required.')
        .test(
          'is-mnemonic',
          'Please type in the genearted mnemonic is invalid',
          value => value === props.mnemonic,
        ),
      password: Yup.string()
        .required('Password is required.')
        .min(
          8,
          'Password needs to be at least 8 chars long. For your security!',
        ),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

export default compose(
  withGenerateWalletState,
  withFormValidation,
)(GenerateWallet);
