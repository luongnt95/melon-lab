import { withFormik } from 'formik';
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';
import {
  greaterThan,
  max,
  min,
} from '~/utils/functionalBigNumber';

const initialState = props => {
  const isMarket = props.strategy === 'Market' ? true : false;

  return {
    type: props.selectedOrderType ? props.selectedOrderType : '',
    exchange: props.selectedExchange ? props.selectedExchange : '',
    price: props.selectedOrder && isMarket ? props.selectedOrder : '',
    quantity: '',
    total: '',
  };
};

const claculateInputs = (props, field, value) => {
  const { values, info, strategy } = props;
  let maxTotal;
  let maxQuantity;

  const typeValue = field === 'type' ? value : values.type;
  const totalValue = field === 'total' ? value : values.total;
  const quantityValue = field === 'quantity' ? value : values.quantity;

  if (strategy === 'Market') {
    maxTotal =
      typeValue === 'Buy'
        ? min(info.tokens.quoteToken.balance, totalValue)
        : totalValue;
    maxQuantity =
      typeValue === 'Sell'
        ? max(info.tokens.baseToken.balance, quantityValue)
        : quantityValue;
  } else if (strategy === 'Limit') {
    maxTotal = typeValue === 'Buy' ? info.tokens.quoteToken.balance : Infinity;
    maxQuantity =
      typeValue === 'Sell' ? info.tokens.baseToken.balance : Infinity;
  }

  if (field === 'total') {
    if (greaterThan(value, maxTotal)) {
      const quantity = (maxTotal / values.price);
      props.setFieldValue('total', maxTotal);
      props.setFieldValue('quantity', quantity);
    } else if (values.price) {
      const quantity = (value / values.price);
      if (values.quantity !== value) {
        props.setFieldValue('quantity', quantity);
      }
    }
  }

  if (field === 'quantity') {
    if (greaterThan(value, maxQuantity)) {
      const total = (maxQuantity * values.price);
      props.setFieldValue('quantity', maxQuantity);
      props.setFieldValue('total', total);
    } else if (values.price) {
      const total = (value * values.price);
      if (values.total !== value) {
        props.setFieldValue('total', total);
      }
    }
  }

  if (field === 'price' && values.quantity) {
    props.setFieldValue('total', (values.quantity * value));
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
    onChange: props => (values, event) => {
      props.setFieldValue(event.target.name, event.target.value);
      claculateInputs(props, event.target.name, values.floatValue);
    },
  }),
);

export { withFormHandler, withFormValidation };
