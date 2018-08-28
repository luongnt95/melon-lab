import { withFormik } from 'formik';
import { compose } from 'recompose';
import * as Yup from 'yup';
import RestoreWallet from './index';

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  validationSchema: Yup.object().shape({
    mnemonic: Yup.string().required('mnemonic is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    if (form.props.onSubmit) {
      form.props.onSubmit(values);
    }
  },
});

export default compose(withFormValidation)(RestoreWallet);
