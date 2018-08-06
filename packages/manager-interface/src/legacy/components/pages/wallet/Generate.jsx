import React from 'react';
import CreateWallet from '@melonproject/manager-components/components/CreateWallet';

const Generate = ({ restore, mnemonic }) => (
  <CreateWallet restore={restore} mnemonic={mnemonic} />
);

export default Generate;
