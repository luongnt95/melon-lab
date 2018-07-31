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
      <h3>Get started</h3>
      {networkId === '1' ? (
        <Fragment>
          <h4> You are accessing Melon on the Ethereum main network.</h4>
          <p>
            AT THE END OF THE TESTING PERIOD OR AT ANY ARBITRARY POINT IN TIME
            AS DEFINED BY MELONPORT AG, THE SMART CONTRACT SYSTEM WILL BE CLOSED
            DOWN. THIS IS EXPECTED TO HAPPEN IN A MATTER OF DAYS OR WEEKS FROM
            DEPLOYMENT DATE. AT THIS POINT, THE USERS WON’T BE ABLE TO INTERACT
            WITH THE THE SMART CONTRACT SYSTEM ANYMORE THROUGH EXECUTING MAKE OR
            TAKE ORDERS, OR THROUGH THE INVEST FUNCTIONS.
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            <b>Melon</b>, [méllō], μέλλω; Greek for <b>"destined to be"</b>:
          </p>
          <p>
            Blockchain software that seeks to enable participants to set up,
            manage and invest in technology regulated digital investment funds.
          </p>
          <p>
            Set up your own technology regulated fund and discover the future of
            asset management.
          </p>
        </Fragment>
      )}
      <Button onClick={onStart}>{linkCaption}</Button>
    </div>
  );
};

export default GetStarted;
