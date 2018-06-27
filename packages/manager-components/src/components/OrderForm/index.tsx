import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Dropdown from '~/blocks/Dropdown';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import OrderInfo from '~/blocks/OrderInfo';
import Switch from '~/blocks/Switch';

import styles from './styles.css';

interface FormValues {
  price: string;
  quantity: string;
  total: string;
  exchange: string;
  type: string;
}

export interface OrderFormProps {
  values: FormValues;
  handleSubmit?: any;
  handleBlur?: any;
  onChange?: React.ChangeEvent<any>;
  info?: any;
  baseTokenSymbol?: string;
  quoteTokenSymbol?: string;
  strategy?: string;
  exchanges: Array<{
    name: string;
    label: string;
  }>;
  selectedOrder?: any;
  errors: any;
  touched: any;
  decimals?: number;
  type?: string;
  dataValid?: boolean;
}

export const OrderForm: StatelessComponent<OrderFormProps> = ({
  handleSubmit,
  handleBlur,
  onChange,
  info,
  baseTokenSymbol,
  quoteTokenSymbol,
  strategy,
  exchanges,
  selectedOrder,
  errors,
  values,
  touched,
  decimals,
  dataValid,
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
          isChecked={
            values && isMarket
              ? values.type === 'sell'
                ? true
                : false
              : undefined
          }
          disabled={isMarket || !dataValid}
        />
      </div>
      <div className="order-form__dropdown">
        <Dropdown
          name="exchange"
          value={values.exchange ? values.exchange : selectedOrder.exchange}
          options={exchanges}
          label="Exchange Server"
          onChange={onChange}
          disabled={isMarket || !dataValid}
        />
      </div>
      <div className="order-form__order-info">
        <OrderInfo {...info} />
      </div>
      <div className="order-form__input">
        <Input
          value={values.price}
          disabled={isMarket || !dataValid}
          type="number"
          label="Price"
          name="price"
          insideLabel="true"
          placeholder="0.0000"
          decimals={decimals}
          onChange={onChange}
          onBlur={handleBlur}
          required={true}
          formatNumber={true}
          error={touched.price && errors.price}
        />
      </div>
      <div className="order-form__input">
        <Input
          value={values.quantity}
          type="number"
          label="Quantity"
          name="quantity"
          insideLabel="true"
          placeholder="0.0000"
          decimals={decimals}
          onChange={onChange}
          onBlur={handleBlur}
          required={true}
          formatNumber={true}
          error={touched.quantity && errors.quantity}
          disabled={(isMarket && !selectedOrder) || !dataValid}
        />
      </div>
      <div className="order-form__input">
        <Input
          value={values.total}
          type="number"
          label="Total"
          name="total"
          insideLabel="true"
          placeholder="0.0000"
          decimals={decimals}
          onChange={onChange}
          onBlur={handleBlur}
          required={true}
          formatNumber={true}
          error={touched.total && errors.total}
          disabled={(isMarket && !selectedOrder) || !dataValid}
        />
      </div>
      <Button
        disabled={(isMarket && !selectedOrder) || !dataValid}
        onClick={handleSubmit}
        type="submit"
      >
        Transfer
      </Button>
    </Form>
  );
};

export default OrderForm;
