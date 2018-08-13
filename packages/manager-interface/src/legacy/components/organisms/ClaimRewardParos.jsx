import React from 'react';
import { Field } from 'redux-form';
import { List, Button, Card, Checkbox } from 'semantic-ui-react';
import { tracks } from '@melonproject/melon.js';

import renderInput from '../utils/renderInput';

// Explicitely decompose props here.
const ClaimRewardParos = ({ claimReward, isParosActive, endTime, redeemParosShares }) => (
  <Card>
    <Card.Content>
      <Card.Header>
        Paros reward
        </Card.Header>
      <br />
      {isParosActive ?
        <div>
          <h5>Naxos reward can only be claimed at the end of the Naxos epoch. The competition will end on {endTime}</h5>
        </div> :
        <div>
          <h5>Naxos has ended. You can now claim your reward. By clicking the "Claim shares" button, the shares of your fund will be transfered back to your account. Then click on the "Redeem" button, and the underlying assets of your fund will then be transfered to your manager address.</h5>
          <Button basic color="black" style={{ width: '100%' }} onClick={claimReward}>
            Step 1: Claim my shares from the Naxos contract
        </Button>
          <br />
          <br />
          <Button basic color="black" style={{ width: '100%' }} onClick={redeemParosShares}>
            Step 2: Redeem my shares
        </Button>
        </div>


      }

    </Card.Content>
  </Card >
);

export default ClaimRewardParos;
