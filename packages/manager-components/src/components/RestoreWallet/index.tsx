import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';

import styles from './styles.css';

interface FormValues {
  mnemonic: string;
}

export interface RestoreWalletProps {
  error?: string;
  errors?: any;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
}

export const RestoreWallet: StatelessComponent<RestoreWalletProps> = ({
  error,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  touched,
  values,
}) => (
  <div className="restore-wallet">
    <style jsx>{styles}</style>
    <h3>Confirm mnemonic</h3>
    <p>Please type your 12-words mnemonic:</p>
    {touched.mnemonic &&
      error && <p className="restore-wallet__error">{error}</p>}
    <Form onSubmit={handleSubmit}>
      <div className="restore-wallet__input">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mnemonic}
          required={true}
          name="mnemonic"
          type="text"
          placeholder="mnemonic"
          error={touched.mnemonic && errors.mnemonic}
        />
      </div>
      <Button type="submit" style="secondary">
        Import
      </Button>
    </Form>
  </div>
);

export default RestoreWallet;
