import { withFormik } from 'formik';
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';

import PasswordForm from './index';

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  validationSchema: Yup.object().shape({
    password: Yup.string().required('Password is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    if (form.props.onSubmit) {
      form.props.onSubmit(values, 'passwordForm');
    }
  },
});

const withFormHandler = compose(
  withHandlers({
    onChange: props => (values, event) => {
      props.setFieldValue(event.target.name, values.value);
    },
  }),
);

export default compose(
  withFormValidation,
  withFormHandler,
)(PasswordForm);
