import React from 'react';
import Account from '@melonproject/manager-components/components/Account';

const MyAccount = ({
  currentAddress,
  associatedFund,
  deleteWallet,
  gotoAccountGenerate,
  gotoAccountRestore,
  gotoImportJSON,
  gotoSetup,
  downloadJSON,
  networkId,
  isCompetition,
  goToFund,
}) => (
  <Account
    currentAddress={currentAddress}
    associatedFund={associatedFund}
    deleteWallet={deleteWallet}
    gotoAccountGenerate={gotoAccountGenerate}
    gotoAccountRestore={gotoAccountRestore}
    gotoImportJSON={gotoImportJSON}
    gotoSetup={gotoSetup}
    downloadJSON={downloadJSON}
    networkId={networkId}
    isCompetition={isCompetition}
    goToFund={goToFund}
  />
);

export default MyAccount;
