import React, { StatelessComponent } from 'react';
import Dropzone from 'react-dropzone';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface ImportWalletProps {
  parseWallet?: () => void;
  goToAccount?: () => void;
}

export const ImportWallet: StatelessComponent<ImportWalletProps> = ({
  parseWallet,
  goToAccount,
}) => {
  return (
    <div className="import-wallet">
      <style jsx>{styles}</style>
      <h3>Import wallet</h3>
      <div className="import-wallet__dropzone">
        <Dropzone
          onDrop={parseWallet}
          style={{
            width: '100%',
            border: '1px dotted black',
            padding: 10,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <p>Select a wallet JSON file from your computer</p>
        </Dropzone>
      </div>
      <Button style="secondary" onClick={goToAccount}>
        Cancel
      </Button>
    </div>
  );
};

export default ImportWallet;
