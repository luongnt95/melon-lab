import { withFormik } from 'formik';
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';

import FeeForm from './index';

const calculateTotal = (props, field, value) => {
  const { values } = props;
};

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
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
      calculateTotal(props, event.target.name, values.value);
    },
  }),
);

export default compose(
  withFormValidation,
  withFormHandler,
)(FeeForm);
