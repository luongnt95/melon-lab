import React, { StatelessComponent } from 'react';
import { compose } from 'recompose';
import Button from '~/blocks/Button';
import Dropdown from '~/blocks/Dropdown';
import Form from '~/blocks/Form';
import FormError from '~/blocks/FormError';
import Input from '~/blocks/Input';
import OrderInfo from '~/blocks/OrderInfo';
import Switch from '~/blocks/Switch';
import {
  withDefaultProps,
  withFormHandler,
  withFormValidation,
} from '~/containers/OrderForm';

import styles from './styles.css';

export interface OrderFormProps {
  values: {
    price: string;
    quantity: string;
    total: string;
    exchange: string;
    type: string;
  };
  handleSubmit?: any;
  onChange?: React.ChangeEvent<any>;
  info?: any;
  baseTokenSymbol?: string;
  quoteTokenSymbol?: string;
  strategy?: string;
  exchanges: Array<{
    name: string;
    label: string;
  }>;
  selectedOrder?: string;
  selectedExchange?: string;
  errors: any;
}

export const OrderForm: StatelessComponent<OrderFormProps> = ({
  handleSubmit,
  onChange,
  info,
  baseTokenSymbol,
  quoteTokenSymbol,
  strategy,
  exchanges,
  selectedOrder,
  selectedExchange,
  errors,
  values,
}) => {
  const isMarket = strategy === 'Market' ? true : false;

  return (
    <Form className="order-form">
      <style jsx>{styles}</style>
      <div className="order-form__switch">
        <Switch
          options={[baseTokenSymbol, quoteTokenSymbol]}
          labels={['Buy', 'Sell']}
          onChange={onChange}
          name="type"
        />
      </div>
      <div className="order-form__dropdown">
        <Dropdown
          name="exchange"
          value={values.exchange ? values.exchange : selectedExchange}
          options={exchanges}
          label="Exchange Server"
          onChange={onChange}
        />
      </div>
      <div className="order-form__order-info">
        <OrderInfo {...info} />
      </div>
      <div className="order-form__input">
        <Input
          value={values.price}
          disabled={isMarket && !selectedOrder}
          type="number"
          label="Price"
          name="price"
          insideLabel="true"
          placeholder="0.0000"
          onChange={onChange}
          required={true}
          errors={errors.price && true}
        />
        <div className="order-form__error">
          <FormError>{errors.price}</FormError>
        </div>
      </div>
      <div className="order-form__input">
        <Input
          value={values.quantity}
          type="number"
          label="Quantity"
          name="quantity"
          insideLabel="true"
          placeholder="0.0000"
          onChange={onChange}
          required={true}
          errors={errors.quantity && true}
        />
        <div className="order-form__error">
          <FormError>{errors.quantity}</FormError>
        </div>
      </div>
      <div className="order-form__input">
        <Input
          value={values.total}
          type="number"
          label="Total"
          name="total"
          insideLabel="true"
          placeholder="0.0000"
          onChange={onChange}
          required={true}
          errors={errors.total && true}
        />
        <div className="order-form__error">
          <FormError>{errors.total}</FormError>
        </div>
      </div>

      <Button onClick={handleSubmit} type="submit">
        Transfer
      </Button>
    </Form>
  );
};

export default compose(withDefaultProps, withFormValidation, withFormHandler)(
  OrderForm,
);
