import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Toggle from '~/blocks/Toggle';

import styles from './styles.css';

interface FormValues {
  type: string;
  quantity: string;
  price: string;
  total: string;
}

export interface ParticipationFormProps {
  values: FormValues;
  handleSubmit?: any;
  handleBlur?: any;
  onChange?: React.ChangeEvent<any>;
  touched?: any;
  errors?: any;
  decimals?: number;
  setup: boolean;
  dataValid: boolean;
  quoteAsset: string;
}

const ParticipationForm: StatelessComponent<ParticipationFormProps> = ({
  values,
  handleSubmit,
  handleBlur,
  onChange,
  touched,
  errors,
  decimals,
  setup,
  dataValid,
  quoteAsset,
}) => {
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <div className="participation-form">
      <style jsx>{styles}</style>
      <h3>Participation</h3>
      <Form>
        {setup && (
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
        {!dataValid && <p>Invest/Redeem not possible when price feed down</p>}
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

        <Button onClick={handleSubmit} type="submit" disabled={!dataValid}>
          Submit request
        </Button>
      </Form>
    </div>
  );
};

export default ParticipationForm;
