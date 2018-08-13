import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Dropdown from '~/blocks/Dropdown';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Switch from '~/blocks/Switch';
import Toggle from '~/blocks/Toggle';
import OrderInfo from '~/components/OrderInfo';

import styles from './styles.css';

interface FormValues {
  price: string;
  quantity: string;
  total: string;
  exchange: string;
  orderType: string;
  strategy: string;
}

export interface OrderFormProps {
  values: FormValues;
  handleSubmit?: () => void;
  handleBlur?: () => void;
  onChange?: React.ChangeEvent<any>;
  info?: any;
  baseTokenSymbol?: string;
  quoteTokenSymbol?: string;
  exchanges: Array<{
    name: string;
    label: string;
  }>;
  selectedOrder?: () => void;
  errors: any;
  touched: any;
  decimals?: number;
  type?: string;
  dataValid?: boolean;
  isManager?: boolean;
  isCompetition?: boolean;
}

export const OrderForm: StatelessComponent<OrderFormProps> = ({
  handleSubmit,
  handleBlur,
  onChange,
  info,
  baseTokenSymbol,
  quoteTokenSymbol,
  exchanges,
  selectedOrder,
  errors,
  values,
  touched,
  decimals,
  dataValid,
  isManager,
  isCompetition,
}) => {
  const isMarket = values.strategy === 'Market' ? true : false;
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <div className="order-form">
      <style jsx>{styles}</style>
      <h3>Trade</h3>
      <Form>
        {!dataValid && <p>Trading not possible when price feed down</p>}
        <div className="order-form__toggles">
          <div className="order-form__toggle">
            <Toggle
              name="strategy"
              value="Market"
              text="Market"
              isChecked={values.strategy === 'Market'}
              onChange={onChange}
            />
          </div>
          <div className="order-form__toggle">
            <Toggle
              name="strategy"
              value="Limit"
              text="Limit"
              isChecked={values.strategy === 'Limit'}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="order-form__switch">
          <Switch
            options={[baseTokenSymbol, quoteTokenSymbol]}
            labels={['Buy', 'Sell']}
            onChange={onChange}
            name="orderType"
            value={values.orderType}
            isChecked={values.orderType === 'Sell' ? true : false}
            disabled={isMarket || !dataValid || !isManager}
          />
        </div>
        {/* <div className="order-form__dropdown">
          <Dropdown
            name="exchange"
            value={values.exchange}
            options={exchanges}
            label="Exchange"
            onChange={onChange}
            disabled={isMarket || !dataValid}
          />
        </div> */}
        <div className="order-form__order-info">
          <OrderInfo {...info} />
        </div>
        <div className="order-form__input">
          <Input
            value={values.price}
            disabled={isMarket || !dataValid || !isManager}
            type="number"
            label="Price"
            name="price"
            insideLabel="true"
            placeholder={numberPlaceholder}
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
            placeholder={numberPlaceholder}
            decimals={decimals}
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.quantity && errors.quantity}
            disabled={(isMarket && !values.price) || !dataValid || !isManager}
          />
        </div>
        <div className="order-form__input">
          <Input
            value={values.total}
            type="number"
            label="Total"
            name="total"
            insideLabel="true"
            placeholder={numberPlaceholder}
            decimals={decimals}
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.total && errors.total}
            disabled={(isMarket && !values.price) || !dataValid || !isManager}
          />
        </div>
        <Button
          disabled={(isMarket && !values.price) || !dataValid || !isManager}
          onClick={handleSubmit}
          type="submit"
        >
          {values.orderType}
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;
