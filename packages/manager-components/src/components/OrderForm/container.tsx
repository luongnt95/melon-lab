import { withFormik } from 'formik';
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';
import {
  divide,
  greaterThan,
  max,
  min,
  multiply,
} from '../../utils/functionalBigNumber';
import OrderForm from './index';

const claculateInputs = (props, field, value) => {
  const { values, info } = props;
  let maxTotal;
  let maxQuantity;

  const typeValue = field === 'type' ? value : values.orderType;
  const totalValue = field === 'total' ? value : values.total;
  const quantityValue = field === 'quantity' ? value : values.quantity;

  if (values.strategy === 'Market') {
    maxTotal =
      typeValue === 'Buy'
        ? min(info.tokens.quoteToken.balance, totalValue)
        : totalValue;
    maxQuantity =
      typeValue === 'Sell'
        ? max(info.tokens.baseToken.balance, quantityValue)
        : quantityValue;
  } else if (values.strategy === 'Limit') {
    maxTotal = typeValue === 'Buy' ? info.tokens.quoteToken.balance : Infinity;
    maxQuantity =
      typeValue === 'Sell' ? info.tokens.baseToken.balance : Infinity;
  }

  if (field === 'total') {
    if (greaterThan(value, maxTotal)) {
      props.setFieldValue('total', maxTotal);
    } else if (values.price) {
      const quantity = divide(value, values.price);
      if (values.quantity !== value) {
        props.setFieldValue('quantity', quantity);
      }
    }
  }

  if (field === 'quantity') {
    if (greaterThan(value, maxQuantity)) {
      props.setFieldValue('quantity', maxQuantity);
    } else if (values.price) {
      const total = multiply(value, values.price);
      if (values.total !== value) {
        props.setFieldValue('total', total);
      }
    }
  }

  if (field === 'price' && values.quantity) {
    props.setFieldValue('total', multiply(values.quantity, value));
  }
};

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.values }),
  validationSchema: Yup.object().shape({
    price: Yup.string().required('Price is required.'),
    quantity: Yup.string().required('Quantity is required.'),
    total: Yup.string().required('Total is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    form.props.onSubmit(values);
  },
});

const withFormHandler = compose(
  withHandlers({
    onChange: props => (values, event) => {
      props.setFieldValue(event.target.name, values.value);
      claculateInputs(props, event.target.name, values.value);
    },
  }),
);

export default compose(
  withFormValidation,
  withFormHandler,
)(OrderForm);
