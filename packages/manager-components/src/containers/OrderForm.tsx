import { withHandlers, defaultProps, withState } from 'recompose';
import { cleanNumber } from '~/utils/Validation';

const withInputValueState = withState('value', 'updateValue', '');
const withInputValueHandlers = withHandlers({
  onChange: props => event => {
    props.cleanNumber
      ? props.updateValue(cleanNumber(event, props.decimals))
      : props.updateValue(event.target.value);
  },
});

const withDefaultProps = defaultProps({
  info: {
    lastPrice: 8.125,
    bid: 8.125,
    ask: 8.125,
    balances: [
      {
        name: 'ETH-T',
        value: 8.125,
      },
      {
        name: 'MLN-T',
        value: 8.125,
      },
    ],
  },
  fields: {
    dropdown: {
      name: 'exchange',
      options: [
        { value: 'RadarRelay', name: 'Radar Relay' },
        { value: 'OasisDEX', name: 'OasisDEX' },
      ],
      label: 'Exchange Server',
    },
    switch: {
      options: [
        'ETH-T-M',
        'MLN-T-M',
      ],
      labels: [
        'Buy',
        'Sell',
      ],
    },
    inputs: {
      price: {
        label: 'Price',
        name: 'price',
        insideLabel: true,
        cleanNumber: true,
        decimals: 4,
        placeholder: '0.0000',
      },
      quantity: {
        label: 'Quantity',
        name: 'quantity',
        insideLabel: true,
        cleanNumber: true,
        decimals: 4,
        placeholder: '0.0000',
      },
      total: {
        label: 'Total',
        name: 'total',
        insideLabel: true,
        cleanNumber: true,
        decimals: 4,
        placeholder: '0.0000',
      },
    },
  },
});

export { withDefaultProps, withInputValueState, withInputValueHandlers };
