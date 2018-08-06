import React from 'react';
import RestoreWallet from '../../../containers/wallet/Restore';

const Restore = ({ handleSubmit, error }) => (
  <RestoreWallet handleSubmit={handleSubmit} error={error} />
);

export default Restore;
