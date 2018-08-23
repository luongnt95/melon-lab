import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Notification from '~/blocks/Notification';
import Toggle from '~/blocks/Toggle';

import styles from './styles.css';

interface FormValues {
  price: string;
  quantity: string;
  total: string;
  type: string;
}

export interface ParticipationFormProps {
  dataValid: boolean;
  decimals?: number;
  errors?: any;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  onChange?: () => void;
  quoteAsset: string;
  setup: boolean;
  touched?: any;
  values: FormValues;
}

const ParticipationForm: StatelessComponent<ParticipationFormProps> = ({
  dataValid,
  decimals,
  errors,
  handleBlur,
  handleSubmit,
  onChange,
  quoteAsset,
  setup,
  touched,
  values,
}) => {
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <div className="participation-form">
      <style jsx>{styles}</style>
      <h3>Participation</h3>
      <Form>
        {!dataValid && (
          <Notification isWarning>
            Invest/Redeem not possible when price feed down
          </Notification>
        )}

        {!setup && (
          <div className="participation-form__toggles">
            <div className="participation-form__toggle">
              <Toggle
                name="type"
                value="Invest"
                text="Invest"
                isChecked={values.type === 'Invest'}
                onChange={onChange}
              />
            </div>
            <div className="participation-form__toggle">
              <Toggle
                name="type"
                value="Slices"
                text="Slices"
                isChecked={values.type === 'Slices'}
                onChange={onChange}
              />
            </div>
          </div>
        )}

        <div className="participation-form__input">
          <Input
            value={values.quantity}
            type="number"
            label="Quantity (Shares)"
            name="quantity"
            insideLabel="true"
            placeholder={numberPlaceholder}
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.quantity && errors.quantity}
            disabled={!dataValid}
          />
        </div>

        {values.type !== 'Slices' && (
          <Fragment>
            <div className="participation-form__input">
              <Input
                value={values.price}
                type="number"
                label={`Price (${quoteAsset})`}
                name="price"
                insideLabel="true"
                placeholder={numberPlaceholder}
                onChange={onChange}
                onBlur={handleBlur}
                required={true}
                formatNumber={true}
                error={touched.price && errors.price}
                disabled={true}
              />
            </div>
            <div className="participation-form__input">
              <Input
                value={values.total}
                type="number"
                label={`Total (${quoteAsset})`}
                name="total"
                insideLabel="true"
                placeholder={numberPlaceholder}
                onChange={onChange}
                onBlur={handleBlur}
                required={true}
                formatNumber={true}
                error={touched.total && errors.total}
                disabled={!dataValid}
              />
            </div>
          </Fragment>
        )}

        <div className="participation-form__input">
          <Button onClick={handleSubmit} type="submit" disabled={!dataValid}>
            Submit request
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ParticipationForm;
