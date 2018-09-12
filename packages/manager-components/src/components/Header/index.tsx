import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';
import Link from '~/utils/link';

import styles from './styles.css';

export interface HeaderProps {
  address?: string;
  balances: {
    eth: number;
  };
  network?: string;
  status?: {
    message?: string;
    link?: string;
    type?: string;
  };
}

export const Header: StatelessComponent<HeaderProps> = ({
  address,
  balances,
  network,
  status,
}) => {
  const statusClassName = classNames('header__account-status', {
    'header__account-status--warning': status && status.type === 'WARNING',
    'header__account-status--error': status && status.type === 'ERROR',
  });

  return (
    <div className="header">
      <style jsx>{styles}</style>
      <div className="header__logo">
        <Link href="/">
          <a>
            <span className="header__logo-default">
              <Icon width="115px" height="30px" name="logos_with-text" />
            </span>
            <span className="header__logo-small">
              <Icon width="30px" height="30px" name="logos_default" />
            </span>
          </a>
        </Link>
      </div>
      <div className="header__account">
        <div className="header__account-name">{''}</div>
        <div className="header__account-info">
          <span className="header__account-address">
            <Link href="/wallet">
              <a>
                {address}
              </a>
            </Link>
          </span>
          {balances && balances.eth && (
            <span className="header__account-balances">
              <span className="header__account-balance">ETH {balances.eth}</span>
            </span>
          )}
          {network && (
            <span className="header__account-network">{network}</span>
          )}
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
