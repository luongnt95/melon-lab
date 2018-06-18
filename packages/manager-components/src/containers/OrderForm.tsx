import * as R from 'ramda';
import {
  compose,
  defaultProps,
  mapProps,
  withProps,
  withState,
} from 'recompose';

const withFormProps = withProps(props => {
  const isMarket = props.strategy === 'Market' ? true : false;
  const valueLens = R.lensPath(['form', 'price', 'disabled']);
  const newValue = isMarket;
  return R.set(valueLens, newValue, props);
});

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
};
const initialState = {
  form: {
    buy: {
      value: 'Buy',
    },
    price: {},
    quantity: {},
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
    ...rest,
  })),
);

export { withDefaultProps, withFormProps, mapFormProps };
