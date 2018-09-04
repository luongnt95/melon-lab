import React, { StatelessComponent } from 'react';
import Generate from '~/components/Generate';
import PasswordForm from '~/components/PasswordForm/container';
import RestoreWallet from '~/components/RestoreWallet/container';
import StepNavigation from '~/components/StepNavigation';
import TermsAndConditions from '~/components/TermsAndConditions';

import styles from './styles.css';

export interface GenerateWalletProps {
  generatedMnemonic: string;
  restoreWallet;
  passwordForm;
  page;
  setPage;
  onSubmitMnemonic;
  onSubmitPassword;
  onSubmitSign;
  error;
  generate;
  setupFund;
}

export const GenerateWallet: StatelessComponent<GenerateWalletProps> = ({
  generatedMnemonic,
  restoreWallet,
  passwordForm,
  page,
  setPage,
  onSubmitMnemonic,
  onSubmitPassword,
  onSubmitSign,
  error,
  generate = true,
  setupFund = false,
}) => {
  const handleSubmitGenerate = () => {
    return setPage(page + 1);
  };

  const handleSubmitMnemonic = values => {
    onSubmitMnemonic(values).then(result => {
      if (result.reason) {
        return setPage(page);
      } else {
        return setPage(page + 1);
      }
    });
  };

  const handleSubmitPassword = values => {
    onSubmitPassword(values);
    if (setupFund) {
      return setPage(page + 1);
    }
  };

  const steps = [
    {
      name: 'Import',
      element: (
        <RestoreWallet
          {...restoreWallet}
          onSubmit={handleSubmitMnemonic}
          error={error}
        />
      ),
    },
    {
      name: 'Password',
      element: (
        <PasswordForm
          {...passwordForm}
          onSubmit={handleSubmitPassword}
          canCancel={false}
          showTitle
        />
      ),
    },
  ];

  if (generate) {
    steps.unshift({
      name: 'Generate',
      element: (
        <Generate
          generatedMnemonic={generatedMnemonic}
          onSubmit={handleSubmitGenerate}
        />
      ),
    });
  }

  if (setupFund) {
    steps.push({
      name: 'Terms',
      element: <TermsAndConditions sign={onSubmitSign} />,
    });
  }

  return (
    <div className="generate-wallet">
      <style jsx>{styles}</style>

      <StepNavigation steps={steps} page={page} />

      <div className="generate-wallet__content">{steps[page].element}</div>
    </div>
  );
};

export default GenerateWallet;
