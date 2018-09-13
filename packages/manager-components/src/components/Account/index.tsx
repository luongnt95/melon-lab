import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Link from '~/link';
import StyledLink from '~/blocks/Link';

import styles from './styles.css';

export interface AccountProps {
  associatedFund?: string;
  currentAddress?: string;
  deleteWallet: () => void;
  downloadJSON: () => void;
  goToFund?: (associatedFund) => void;
  gotoImportJSON: () => void;
  isCompetition?: boolean;
  networkId: string;
}

export const Account: StatelessComponent<AccountProps> = ({
  associatedFund,
  currentAddress,
  deleteWallet,
  downloadJSON,
  goToFund,
  gotoImportJSON,
  isCompetition,
  networkId,
}) => {
  const onClickGoToFund = () =>
    associatedFund && goToFund && goToFund(associatedFund);

  const isDanger = currentAddress ? 'danger' : 'secondary';

  return (
    <div className="account">
      <style jsx>{styles}</style>
      <h3>Your Wallet</h3>
      {currentAddress ? (
        <Fragment>
          <p>
            Your ethereum address. Use this for white listing on{' '}
            <a href="https://ico.bitcoinsuisse.ch/" target="_blank">
              ico.bitcoinsuisse.ch
            </a>
            :
            <strong>
              <a
                href={`https://${
                  networkId === '42' ? 'kovan.' : ''
                }etherscan.io/address/${currentAddress}`}
                target="_blank"
              >
                {' '}
                {currentAddress}{' '}
              </a>
            </strong>
          </p>
          {associatedFund && (
            <p>
              Associated fund address:{' '}
              <strong>
                <a
                  href={`https://${
                    networkId === '42' ? 'kovan.' : ''
                  }etherscan.io/address/${associatedFund}`}
                  target="_blank"
                >
                  {associatedFund}
                </a>
              </strong>
            </p>
          )}

          <p>
            <strong>
              It is highly recommended to download a backup of your wallet. You
              can import this into{' '}
              <a href="https://mycrypto.com/" target="_blank">
                MyCrypto.com
              </a>{' '}
              or Parity.
            </strong>
          </p>
          <p>
            <Button style="secondary" onClick={downloadJSON}>
              Download wallet backup JSON
            </Button>
          </p>
          {!associatedFund ? (
            <p>
              <Link href="/setup">
                <StyledLink style="secondary" size="medium" passHref>
                  Setup your fund
                </StyledLink>
              </Link>
            </p>
          ) : (
            <p>
              <Button style="success" onClick={onClickGoToFund}>
                Go to your fund
              </Button>
            </p>
          )}
          <br />
          {!isCompetition && (
            <Fragment>
              <p>
                <strong> [IMPORTANT] - Please read carefully</strong>{' '}
              </p>
              <p>
                Careful, below actions have <strong> irreversible</strong>{' '}
                effects. If you do not have a backup of the mnemonic phrase that
                generated your current address,
                <strong>
                  {' '}
                  you will never be able to access your current wallet again{' '}
                </strong>{' '}
                after performing one of the below actions.
              </p>
              <p>
                If you do not wish to continue,{' '}
                <a href="/">click here to go back to your fund&#39;s page</a>.
              </p>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Before you can setup your fund, you need to import, restore or
            create a wallet:
          </p>
        </Fragment>
      )}

      <Fragment>
        {!isCompetition && (
          <p>
            <Link href="/wallet/generate" passHref>
              <StyledLink style="secondary" size="medium">
                Create a new wallet
              </StyledLink>
            </Link>
          </p>
        )}
        <p>
          <Link href="/wallet/restore" passHref>
            <StyledLink style="secondary" size="medium">
              Restore from mnemonic
            </StyledLink>
          </Link>
        </p>
        <p>
          <Link href="/wallet/import" passHref>
            <StyledLink style="secondary" size="medium">
              Import wallet JSON
            </StyledLink>
          </Link>
        </p>
        {currentAddress &&
          !isCompetition && (
            <p>
              <Button style={isDanger} onClick={deleteWallet}>
                Delete wallet
              </Button>
            </p>
          )}
      </Fragment>
    </div>
  );
};

export default Account;
