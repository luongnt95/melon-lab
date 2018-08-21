import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import styles from './styles.css';

export interface GetStartedProps {
  linkAction?: {
    payload: { address: string };
    type: string;
  };
  linkCaption?: string;
  networkId?: string;
  onClick?: (action) => void;
}

export const GetStarted: StatelessComponent<GetStartedProps> = ({
  linkAction,
  linkCaption,
  networkId,
  onClick,
}) => {
  const onStart = () => {
    if (onClick) {
      onClick(linkAction);
    }
  };

  return (
    <div className="get-started">
      <style jsx>{styles}</style>

      <div className="get-started__welcome">
        <h1 className="get-started__title">
          Welcome to <span className="get-started__name">Melon</span>
        </h1>
      </div>
      <div className="get-started__description">
        {networkId === '1' ? (
          <Fragment>
            <p>
              <b>You are accessing Melon on the Ethereum main network.</b>
            </p>
            <p>
              AT THE END OF THE TESTING PERIOD OR AT ANY ARBITRARY POINT IN TIME
              AS DEFINED BY MELONPORT AG, THE SMART CONTRACT SYSTEM WILL BE
              CLOSED DOWN. THIS IS EXPECTED TO HAPPEN IN A MATTER OF DAYS OR
              WEEKS FROM DEPLOYMENT DATE. AT THIS POINT, THE USERS WON’T BE ABLE
              TO INTERACT WITH THE THE SMART CONTRACT SYSTEM ANYMORE THROUGH
              EXECUTING MAKE OR TAKE ORDERS, OR THROUGH THE INVEST FUNCTIONS.
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <p>
              <b>Melon</b>, [méllō], μέλλω; Greek for <b>"destined to be"</b>:
            </p>
            <p>
              Blockchain software that seeks to enable participants to set up,
              manage and invest in technology regulated digital investment
              funds.
            </p>
            <p>
              Set up your own technology regulated fund and discover the future
              of asset management.
            </p>
          </Fragment>
        )}
        <Button onClick={onStart}>{linkCaption}</Button>
      </div>
    </div>
  );
};

export default GetStarted;
