import * as R from 'ramda';
import React, { StatelessComponent } from 'react';
import { compose } from 'recompose';
import Button from '~/blocks/Button';
import Dropdown from '~/blocks/Dropdown';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import OrderInfo from '~/blocks/OrderInfo';
import Switch from '~/blocks/Switch';
import { mapFormProps, withDefaultProps } from '~/containers/OrderForm';

import styles from './styles.css';

const getValue = R.path(['target', 'value']);

export interface OrderFormProps {
  form: {
    price: object;
    quantity: object;
    total: object;
    exchange: object;
  };
  handleSubmit?: any;
  onChange?: any;
  info?: any;
  baseTokenSymbol?: string;
  quoteTokenSymbol?: string;
  strategy?: string;
  exchanges: Array<object>;
}

export const OrderForm: StatelessComponent<OrderFormProps> = ({
  form,
  handleSubmit,
  onChange,
  info,
  baseTokenSymbol,
  quoteTokenSymbol,
  strategy,
  exchanges,
}) => {
  return (
    <Form className="order-form" onSubmit={handleSubmit}>
      <style jsx>{styles}</style>
      <div className="order-form__switch">
        <Switch
          options={[baseTokenSymbol, quoteTokenSymbol]}
          labels={['Buy', 'Sell']}
          onChange={R.compose(onChange('type'))}
        />
      </div>
      <div className="order-form__dropdown">
        <Dropdown
          name="exchange"
          options={exchanges}
          label="Exchange Server"
          onChange={R.compose(onChange('exchange'), getValue)}
        />
      </div>
      <div className="order-form__order-info">
        <OrderInfo {...info} />
      </div>
      <div className="order-form__input">
        <Input
          type="number"
          label="Price"
          name="price"
          insideLabel="true"
          decimals={4}
          placeholder="0.0000"
          disabled={strategy === 'Market' ? true : false}
          onChange={R.compose(onChange('price'), getValue)}
        />
      </div>
      <div className="order-form__input">
        <Input
          type="number"
          label="Quantity"
          name="quantity"
          insideLabel="true"
          decimals={4}
          placeholder="0.0000"
          onChange={R.compose(onChange('quantity'), getValue)}
        />
      </div>
      <div className="order-form__input">
        <Input
          type="number"
          label="Total"
          name="total"
          insideLabel="true"
          decimals={4}
          placeholder="0.0000"
          onChange={R.compose(onChange('total'), getValue)}
        />
      </div>
      <Button type="submit">Transfer</Button>
    </Form>
  );
};

export default compose(withDefaultProps, mapFormProps)(OrderForm);
