import * as R from 'ramda';
import {
  compose,
  defaultProps,
  mapProps,
  withProps,
  withState,
  withPropsOnChange,
} from 'recompose';

const withStrategyProp = withProps(props => {
  const isMarket = props.strategy === 'Market' ? true : false;
  const valueLens = R.lensPath(['form', 'price', 'disabled']);
  const newValue = isMarket;
  return R.set(valueLens, newValue, props);
});

const initialProps = {
  baseTokenSymbol: 'ETH-T-M',
  quoteTokenSymbol: 'MLN-T-M',
  strategy: 'Market',
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
  form: {
    type: {
      value: 'Buy',
    },
    exchange: {
      value: '',
    },
    price: {
      value: '',
      decimals: 4,
    },
    quantity: {
      value: '',
      decimals: 4,
    },
    total: {
      value: '',
      decimals: 4,
    },
  },
};

const initialState = {
  form: { ...initialProps.form },
};

const withDefaultProps = defaultProps({ ...initialProps });

const calculation = (state, name, value) => {
  if (name === 'price' && state.form.quantity.value && value) {
    return state.form.total.value = state.form.quantity.value * value;
  }

  if (name === 'quantity' && state.form.price.value && value) {
    return state.form.total.value = state.form.price.value * value;
  }

  return state.form.total.value = ''
}

const mapFormProps = compose(
  withState('state', 'updateState', { ...initialState }),
  mapProps(({ updateState, state, ...rest }) => ({
    onChange: name => value =>
      updateState(state => {
        calculation(state, name, value);

        return {
          ...state,
          form: {
            ...state.form,
            [name]: {
              ...state.form[name],
              value,
            },
          },
        };
      }),
    ...R.omit(['form'], rest),
    form: state.form,
  })),
  withStrategyProp
);

export { withDefaultProps, mapFormProps };
