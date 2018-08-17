import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Notification from '~/blocks/Notification';

import styles from './styles.css';

interface FormValues {
  amount: string;
  total: string;
}

export interface ContributionFormProps {
  dataValid: boolean;
  melonAssetSymbol?: string;
  values: FormValues;
  handleSubmit?: () => void;
  handleBlur?: () => void;
  onChange?: () => void;
  touched?: any;
  errors?: any;
}

export const ContributionForm: StatelessComponent<ContributionFormProps> = ({
  handleSubmit,
  dataValid,
  melonAssetSymbol,
  values,
  handleBlur,
  onChange,
  touched,
  errors,
}) => {
  return (
    <div className="contribution-form">
      <style jsx>{styles}</style>
      <h3>ATTENTION REQUIRED: Contribution to Naxos</h3>
      <p>
        You are about to send ether to the Naxos contract. Please type in the
        amount of ETH you wish to contribute in the Naxos Olympiad.
      </p>
      <Form>
        <div className="contribution-form__input">
          <Input
            value={values.amount}
            type="number"
            label="Quantity of ETH to contribute"
            name="amount"
            insideLabel="true"
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.amount && errors.amount}
            disabled={!dataValid}
          />
        </div>
        <div className="contribution-form__input">
          <Input
            value={values.total}
            type="number"
            label={`Estimated ${melonAssetSymbol} to receive`}
            name="total"
            insideLabel="true"
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.total && errors.total}
            disabled={!dataValid}
          />
        </div>

        {!dataValid && (
          <p style={{ color: 'rgb(209, 102, 102)' }}>
            Contribution not authorized when price feed down
          </p>
        )}
        <div className="contribution-form__notification">
          <Notification isWarning>
            This step will transfer the desired amount of ETH from your wallet
            to the Naxos Contribution contract. The Naxos Contribution contract
            will then invest the corresponding amount of MLN into your Melon
            fund (as per terms and conditions). By proceeding you acknowledge
            your understanding of the terms and conditions (
            <a
              href={
                `https://github.com/melonproject/contribution/blob/master/misc/` +
                `Second%20Contribution%20Terms%20%2B%20Naxos%20terms.pdf`
              }
              target="_blank"
            >
              <b>available here</b>
            </a>
            ) and agree to cryptographically sign them.
          </Notification>
        </div>
        <div className="contribution-form__notification">
          <Notification isError>
            Melonport AG cannot be held liable for any action resulting in fund
            loss while using the Melon software.
          </Notification>
        </div>

        <Button style="secondary" disabled={!dataValid} onClick={handleSubmit}>
          I agree, sign and contribute
        </Button>
      </Form>
    </div>
  );
};

export default ContributionForm;
