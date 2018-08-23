import { withFormik } from 'formik';
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';

import FeeForm from './index';

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    gasPrice: Yup.number()
      .required('Gas price is required.')
      .moreThan(0, 'Please enter a valid  gas price'),
  }),
  handleSubmit: (values, form) => {
    if (form.props.onSubmit) {
      form.props.onSubmit(values);
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
)(FeeForm);
