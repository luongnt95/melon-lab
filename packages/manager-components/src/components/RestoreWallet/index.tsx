import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';

import styles from './styles.css';

interface FormValues {
  mnemonic: string;
}

export interface RestoreWalletProps {
  handleSubmit?: () => void;
  handleBlur?: () => void;
  onChange?: () => void;
  values: FormValues;
  error?: string;
  touched?: any;
  errors?: any;
}

export const RestoreWallet: StatelessComponent<RestoreWalletProps> = ({
  handleSubmit,
  handleBlur,
  onChange,
  error,
  values,
  touched,
  errors,
}) => {
  return (
    <div className="restore-wallet">
      <style jsx>{styles}</style>
      <h3>Confirm mnemonic</h3>
      <p>Please type your 12-words mnemonic:</p>
      {touched.mnemonic &&
        error && <p className="restore-wallet__error">{error}</p>}
      <Form>
        <div className="restore-wallet__input">
          <Input
            onChange={onChange}
            onBlur={handleBlur}
            value={values.mnemonic}
            required={true}
            name="mnemonic"
            type="text"
            placeholder="mnemonic"
            error={touched.mnemonic && errors.mnemonic}
          />
        </div>
        <Button type="submit" onClick={handleSubmit} style="secondary">
          Import
        </Button>
      </Form>
    </div>
  );
};

export default RestoreWallet;
