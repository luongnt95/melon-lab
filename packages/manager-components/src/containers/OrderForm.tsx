import * as R from 'ramda';
import { compose, defaultProps, mapProps, withState } from 'recompose';

const initialProps = {
  baseTokenSymbol: 'ETH-T-M',
  quoteTokenSymbol: 'MLN-T-M',
  strategy: 'Market',
  selectedOrder: false,
  info: {
    lastPrice: 0,
    bid: 0,
    ask: 0,
    balances: [
      {
        name: 'ETH-T',
        value: 0,
      },
      {
        name: 'MLN-T',
        value: 0,
      },
    ],
  },
  exchanges: [
    { value: 'RadarRelay', name: 'Radar Relay' },
    { value: 'OasisDEX', name: 'OasisDEX' },
  ],
  selectedExchange: 'RadarRelay',
  selectedOrderType: 'Buy',
  decimals: 4,
};

const initialState = props => {
  return {
    form: {
      type: props.selectedOrderType,
      exchange: props.selectedExchange,
      price: '',
      quantity: '',
      total: '',
    },
  };
};

const withDefaultProps = defaultProps({ ...initialProps });

const calculation = (state, name, value) => {
  if (name === 'price' && state.form.quantity && value) {
    return (state.form.total = state.form.quantity * value);
  }

  if (name === 'quantity' && state.form.price && value) {
    return (state.form.total = state.form.price * value);
  }

  if ((name === 'quantity' || name === 'price') && value < 1) {
    return (state.form.total = '');
  }

  return;
};

const mapFormProps = compose(
  withState('state', 'updateState', initialState),
  mapProps(({ updateState, state, ...rest }) => ({
    onChange: name => value =>
      updateState(currentState => {
        calculation(currentState, name, value);
        return {
          ...currentState,
          form: { ...currentState.form, [name]: value },
        };
      }),
    form: R.prop('form', state),
    ...rest,
  })),
);

export { withDefaultProps, mapFormProps };
