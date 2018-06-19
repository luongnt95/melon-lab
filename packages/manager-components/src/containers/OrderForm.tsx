import { withFormik } from 'formik';
import { compose, defaultProps, withHandlers } from 'recompose';
import * as Yup from 'yup';

const initialState = props => {
  return {
    type: props.selectedOrderType,
    exchange: props.selectedExchange,
    price: '',
    quantity: '',
    total: '',
  };
};

const calculateTotal = (props, name, value) => {
  if (name === 'price' && props.values.quantity && value) {
    props.setFieldValue('total', props.values.quantity * value);
  }
  if (name === 'quantity' && props.values.price && value) {
    props.setFieldValue('total', props.values.price * value);
  }
  if ((name === 'quantity' || name === 'price') && value < 1) {
    props.setFieldValue('total', '');
  }
};

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...initialState(props) }),
  validationSchema: Yup.object().shape({
    price: Yup.string().required('Price is required.'),
    quantity: Yup.string().required('Quantity is required.'),
    total: Yup.string().required('Total is required.'),
  }),
  handleSubmit: values => {
    // TODO: define handleSubmit
  },
});

const withFormHandler = compose(
  withHandlers({
    onChange: props => event => {
      props.setFieldValue(event.target.name, event.target.value);
      calculateTotal(props, event.target.name, event.target.value);
    },
  }),
);

export { withFormHandler, withFormValidation };
