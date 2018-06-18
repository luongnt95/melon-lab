import * as R from 'ramda';
import { compose, defaultProps, mapProps, withState } from 'recompose';

const initialProps = {
  baseTokenSymbol: 'ETH-T-M',
  quoteTokenSymbol: 'MLN-T-M',
  strategy: 'Limit',
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
    price: {
      value: 0,
    },
  },
};

const initialState = {
  form: {
    type: {
      value: 'Buy',
    },
    price: {},
    quantity: {},
    exchange: {
      value: initialProps.exchanges[0].value,
    },
  },
};

const withDefaultProps = defaultProps({ ...initialProps });

const mapFormProps = compose(
  withState('state', 'updateState', { ...initialState }),
  mapProps(({ updateState, state, ...rest }) => ({
    onChange: name => value =>
      updateState(state => {
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
    form: state.form,
    ...rest,
  })),
);

export { withDefaultProps, mapFormProps };
