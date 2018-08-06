import React from 'react';
import GenerateWallet from '@melonproject/manager-components/components/GenerateWallet';

const Generate = ({ restore, mnemonic }) => (
  <GenerateWallet restore={restore} mnemonic={mnemonic} />
);

export default Generate;
