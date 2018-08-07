import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface AdministrationProps {
  subscriptionAllowed?: boolean;
  toggleSubscription?: () => void;
  convertUnclaimedRewards?: () => void;
  shutdown?: () => void;
  loading?: boolean;
  registerForCompetition: () => void;
  fundAddress?: string;
  isCompeting?: boolean;
  quoteAsset?: string;
}

export const Administration: StatelessComponent<AdministrationProps> = ({
  subscriptionAllowed,
  toggleSubscription,
  convertUnclaimedRewards,
  shutdown,
  loading,
  registerForCompetition,
  fundAddress,
  isCompeting,
  quoteAsset,
}) => {
  return (
    <div className="administration">
      <style jsx>{styles}</style>
      <h3>Fund Administration</h3>
      {/* {!isCompeting ? (
          <Button onClick={() => registerForCompetition(fundAddress)}>
            Register for competition
          </Button>
        ) : (
          ""
        )} */}
      {subscriptionAllowed ? (
        <Button style="clear" onClick={toggleSubscription}>
          Disable subscription
        </Button>
      ) : (
        <Button style="clear" onClick={toggleSubscription}>
          Enable subscription
        </Button>
      )}

      <Button style="clear" onClick={convertUnclaimedRewards}>
        Convert unclaimed rewards: 0 {quoteAsset}
      </Button>
      <Button style="clear" onClick={shutdown}>
        Irreversibly shut down fund
      </Button>
      {loading && <p>Please wait for upcoming Metamask popup</p>}
    </div>
  );
};

export default Administration;
