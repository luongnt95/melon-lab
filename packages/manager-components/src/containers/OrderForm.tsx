import { withFormik } from 'formik';
import { compose, defaultProps, withHandlers } from 'recompose';
import * as Yup from 'yup';
import {
  multiply,
  divide,
  greaterThan,
  max,
  min,
} from '~/utils/functionalBigNumber';

const initialState = props => {
  return {
    type: props.selectedOrderType,
    exchange: props.selectedExchange,
    price: '',
    quantity: '',
    total: '',
  };
};

const validateInputs = (props, field, value) => {
  const { values } = props;
  let maxTotal;
  let maxQuantity;

  const type = field === 'type' ? value : values.type;
  if (props.strategy === 'Market') {
    maxTotal =
    type === 'Buy'
        ? min(props.info.tokens.baseToken.balance, values.total)
        : values.total;
    maxQuantity =
    type === 'Sell'
        ? max(props.info.tokens.baseToken.balance, values.quantity)
        : values.quantity;
  } else if (props.strategy === 'Limit') {
    maxTotal = type === 'Buy' ? props.info.tokens.quoteToken.balance : Infinity;
    maxQuantity = type === 'Sell' ? props.info.tokens.baseToken.balance : Infinity;
  }

  if (field === 'total') {
    if (greaterThan(value, maxTotal)) {
      props.setFieldValue('total', maxTotal);
    } else if (values.price) {
      const quantity = divide(value, values.price);

      if (values.quantity !== value)
        props.setFieldValue('quantity', quantity);
    }
  }

  if (field === 'quantity') {
    if (greaterThan(value, maxQuantity)) {
      props.setFieldValue('quantity', maxQuantity);
    } else if (values.price) {
      const total = multiply(values.quantity, values.price);
      if (values.total !== value)
        props.setFieldValue('total', total);
    }
  }

  if (field === 'price' && values.quantity) {
    props.setFieldValue('total', multiply(values.quantity, value));
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
      console.log(props);
      validateInputs(props, event.target.name, event.target.value);
    },
  }),
);

export { withFormHandler, withFormValidation };
