import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';
import styles from './styles.css';

export interface HeaderProps {
  status?: {
    message?: string;
    link?: string;
    type?: string;
  };
  balances: {
    eth: number;
  };
  network?: string;
  account: {
    address: string;
    type?: any;
    action?: any;
  };
  home?: {
    type?: any;
    action?: any;
  };
}

const Logos = (
  <React.Fragment>
    <span className="header__logo-default">
      <Icon width="115px" height="30px" name="logos_with-text" />
    </span>
    <span className="header__logo-small">
      <Icon width="30px" height="30px" name="logos_default" />
    </span>
  </React.Fragment>
);

export const Header: StatelessComponent<HeaderProps> = ({
  status,
  account,
  balances,
  network,
  home,
}) => {
  const walletLink = account && account.type ? (
    React.createElement(account.type, { to: account.action }, account.address)
  ) : (
    account.address
  );

  const homeLink = home && home.type ? (
    React.createElement(home.type, { to: home.action, className: 'header__logo-link' }, Logos)
  ) : (
    Logos
  );

  const statusClassName = classNames('header__account-status', {
    'header__account-status--warning': status && status.type === 'WARNING',
    'header__account-status--error': status && status.type === 'ERROR',
  });

  return (
    <div className="header">
      <style jsx>{styles}</style>
      <div className="header__logo">{homeLink}</div>
      <div className="header__account">
        <div className="header__account-name">{''}</div>
        <div className="header__account-info">
          <span className="header__account-address">{walletLink}</span>
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
