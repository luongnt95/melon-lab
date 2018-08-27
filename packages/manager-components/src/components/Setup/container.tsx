import { withFormik } from 'formik';
import * as Yup from 'yup';
import Setup from './index';

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('name is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    if (form.props.onSubmit) {
      form.props.onSubmit(values);
    }
  },
});

export default withFormValidation(Setup);
