import React, { StatelessComponent } from 'react';
import { compose } from 'recompose';
import Button from '~/blocks/Button';
import Dropdown from '~/blocks/Dropdown';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import OrderInfo from '~/blocks/OrderInfo';
import Switch from '~/blocks/Switch';
import {
  withDefaultProps,
  withInputValueHandlers,
  withInputValueState,
} from '~/containers/OrderForm';

import styles from './styles.css';

export interface OrderFormProps {
  fields: {
    switch: Switch;
    dropdown: Dropdown;
    inputs: Array<[Input]>;
  };
  handleSubmit?: any;
  info?: any;
}

const InputWithValidation = compose(
  withInputValueState,
  withInputValueHandlers,
)(Input);

export const OrderForm: StatelessComponent<OrderFormProps> = ({ fields, handleSubmit, info }) => {
  return (
    <Form className="order-form" onSubmit={handleSubmit}>
      <style jsx>{styles}</style>
      <div className="order-form__switch">
        <Switch {...fields.switch} />
      </div>
      <div className="order-form__dropdown">
        <Dropdown {...fields.dropdown} />
      </div>
      <div className="order-form__order-info">
        <OrderInfo {...info} />
      </div>
      {/* <Inputs {...fields} /> */}
      <div className="order-form__input">
        <InputWithValidation {...fields.inputs.price} />
      </div>
      <div className="order-form__input">
        <InputWithValidation {...fields.inputs.quantity} />
      </div>
      <div className="order-form__input">
        <InputWithValidation {...fields.inputs.total} />
      </div>
      <Button type="submit">Transfer</Button>
    </Form>
  );
};

export default (withDefaultProps)(OrderForm);
