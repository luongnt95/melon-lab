import React from 'react';
import ImportWallet from '@melonproject/manager-components/components/ImportWallet';

const Restore = ({ goToAccount, parseWallet }) => (
  <ImportWallet goToAccount={goToAccount} parseWallet={parseWallet} />
);

export default Restore;
