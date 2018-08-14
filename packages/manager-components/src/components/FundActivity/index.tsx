import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface FundActivityProps {
  requestFullParticipationHistory: () => void;
}

export const FundActivity: StatelessComponent<FundActivityProps> = ({
  requestFullParticipationHistory,
  /*
  subscriptions,
  redemptions,
  */
}) => {
  return (
    <div className="fund-activity">
      <style jsx>{styles}</style>
      <h3>Fund Activity</h3>
      <p>
        Recent Subscriptions
        <br />
        Recent Redemptions
      </p>
      <Button style="secondary" onClick={requestFullParticipationHistory}>
        Request full subscriptions/redeem history
      </Button>
    </div>
  );
};

export default FundActivity;
