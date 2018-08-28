import { withFormik } from 'formik';
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
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

export default withFormValidation(FeeForm);
