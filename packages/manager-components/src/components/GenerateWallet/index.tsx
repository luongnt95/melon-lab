import React, { StatelessComponent } from 'react';
import Generate from '~/components/Generate';
import PasswordForm from '~/components/PasswordForm/container';
import RestoreWallet from '~/components/RestoreWallet/container';
import StepNavigation from '~/components/StepNavigation';

import styles from './styles.css';

export interface GenerateWalletProps {
  generatedMnemonic: string;
  restoreWallet;
  passwordForm;
  page;
  setPage;
  onSubmitMnemonic;
  onSubmitPassword;
  error;
}

export const GenerateWallet: StatelessComponent<GenerateWalletProps> = ({
  generatedMnemonic,
  restoreWallet,
  passwordForm,
  page,
  setPage,
  onSubmitMnemonic,
  onSubmitPassword,
  error,
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
    return onSubmitPassword(values);
  };

  const steps = [
    {
      name: 'Generate',
      isActive: page === 0,
      isCompleted: page > 0,
      element: (
        <Generate
          generatedMnemonic={generatedMnemonic}
          onSubmit={handleSubmitGenerate}
        />
      ),
    },
    {
      name: 'Confirm',
      isActive: page === 1,
      isCompleted: page > 1,
      element: (
        <RestoreWallet {...restoreWallet} onSubmit={handleSubmitMnemonic} error={error} />
      ),
    },
    {
      name: 'Password',
      isActive: page === 2,
      isCompleted: page > 2,
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

  return (
    <div className="generate-wallet">
      <style jsx>{styles}</style>

      <StepNavigation steps={steps} />

      <div className="generate-wallet__content">{steps[page].element}</div>
    </div>
  );
};

export default GenerateWallet;
