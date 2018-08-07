import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface InsufficientFundsProps {
  ethBalance?: string;
  wethBalance?: string;
  walletAddress?: string;
  showFaucet?: boolean;
}

export const InsufficientFunds: StatelessComponent<InsufficientFundsProps> = ({
  ethBalance,
  wethBalance,
  walletAddress,
  showFaucet,
}) => {
  const faucetUrl = `https://faucet.melon.fund/?address=${
    walletAddress ? walletAddress : ''
  }`;

  const onClick = () => {
    window.open(faucetUrl, '_blank', 'noopener', 'noreferrer');
  };

  return (
    <div className="insufficient-funds">
      <style jsx>{styles}</style>
      <h3>Insufficient ETH Balance</h3>
      {showFaucet ? (
        <Fragment>
          <p>
            {' '}
            You don't have enough Kovan Ether or Kovan W-ETH. Current balances:{' '}
            {wethBalance} WETH-T, {ethBalance} ETH
          </p>
          <p>
            To get started, head to our{' '}
            <strong>
              <a href={faucetUrl} rel="noopener noreferrer" target="_blank">
                faucet
              </a>
            </strong>{' '}
            to receive Kovan Ether and Kovan Melon
          </p>
          <p>
            Once you have received ETH-T and MLN-T, go ahead and create your
            Melon fund.
          </p>
          <Button style="secondary" onClick={onClick}>
            Go to faucet
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p>Your account balance is empty.</p>
          <p>
            In order to proceed, please deposit the amount of ETH that you want
            to contribute plus at least 0.1 ETH to cover for gas costs to your
            wallet address:
          </p>
          <p>
            <strong>{walletAddress}</strong>
          </p>
        </Fragment>
      )}
    </div>
  );
};

export default InsufficientFunds;
