import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';

import styles from './styles.css';

export interface GenerateProps {
  generatedMnemonic: string;
  onSubmit;
}

export const Generate: StatelessComponent<GenerateProps> = ({
  generatedMnemonic,
  onSubmit,
}) => {
  return (
    <div className="generate">
      <style jsx>{styles}</style>
      <h3>Generate Account</h3>
      <p>
        The standard bip39 is used to generate a mnemonic phrase, from which
        your wallet will be cryptographically derived.
      </p>
      <div className="generate__notification">
        <Notification isWarning>
          Please write down the following mnemonic and store it in a safe place!
          If you loose your mnemonic you will not be able to access your fund
          again. If someone else gets a copy of this, they can take over your
          wallet & fund and steal your price!
          <div className="generate__mnemonic">{generatedMnemonic}</div>
        </Notification>
      </div>
      <Button style="secondary" onClick={onSubmit}>
        Generate
      </Button>
    </div>
  );
};

export default Generate;
