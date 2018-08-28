import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Notification from '~/blocks/Notification';

import styles from './styles.css';

export interface GenerateWalletProps {
  mnemonic: string;
  restore: () => void;
}

export const GenerateWallet: StatelessComponent<GenerateWalletProps> = ({
  mnemonic,
  restore,
}) => (
  <div className="generate-wallet">
    <style jsx>{styles}</style>
    <h3>Generate Account</h3>
    <p>
      The standard bip39 is used to generate a mnemonic phrase, from which your
      wallet will be cryptographically derived.
    </p>
    <Notification isWarning>
      Please write down the following mnemonic and store it in a safe place! If
      you loose your mnemonic you will not be able to access your fund again. If
      someone else gets a copy of this, they can take over your wallet & fund
      and steal your price!
    </Notification>
    <p className="generate-wallet__mnemonic">{mnemonic}</p>
    <p>
      <Button style="secondary" onClick={restore}>
        I have written down the mnemonic
      </Button>
    </p>
  </div>
);

export default GenerateWallet;
