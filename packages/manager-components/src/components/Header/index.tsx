import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface HeaderProps {
  accountAddress?: string;
  balances: {
    eth: number;
  };
  goToHome: () => void;
  goToWallet: () => void;
  network?: string;
  status?: {
    message?: string;
    link?: string;
    type?: string;
  };
}

export const Header: StatelessComponent<HeaderProps> = ({
  accountAddress,
  balances,
  goToHome,
  goToWallet,
  network,
  status,
}) => {
  const onClickGoToHome = (e: any): void => {
    e.preventDefault(e);
    if (goToHome) {
      goToHome();
    }
  };

  const onClickGoToWallet = (e: any): void => {
    e.preventDefault(e);
    if (goToWallet) {
      goToWallet();
    }
  };

  const statusClassName = classNames('header__account-status', {
    'header__account-status--warning': status && status.type === 'WARNING',
    'header__account-status--error': status && status.type === 'ERROR',
  });

  return (
    <div className="header">
      <style jsx>{styles}</style>
      <div className="header__logo">
        <a href="#" onClick={onClickGoToHome}>
          <span className="header__logo-default">
            <Icon width="115px" height="30px" name="logos_with-text" />
          </span>
          <span className="header__logo-small">
            <Icon width="30px" height="30px" name="logos_default" />
          </span>
        </a>
      </div>
      <div className="header__account">
        <div className="header__account-name">{''}</div>
        <div className="header__account-info">
          <span className="header__account-address">
            <a href="#" onClick={onClickGoToWallet}>
              {accountAddress}
            </a>
          </span>
          <span className="header__account-balances">
            <span className="header__account-balance">ETH {balances.eth}</span>
          </span>
          <span className="header__account-network">{network}</span>
          {status && (
            <span className={statusClassName}>
              {status.link ? (
                <a href={status.link} target="_blank">
                  {status.message}
                </a>
              ) : (
                <React.Fragment>{status.message}</React.Fragment>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
