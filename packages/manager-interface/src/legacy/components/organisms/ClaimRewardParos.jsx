import React from 'react';
import { Field } from 'redux-form';
import { List, Button, Card, Checkbox } from 'semantic-ui-react';
import { tracks } from '@melonproject/melon.js';

import renderInput from '../utils/renderInput';

// Explicitely decompose props here.
const ClaimRewardParos = ({ claimReward, isParosActive, endTime }) => (
    <Card>
        <Card.Content>
            <Card.Header>
                Paros reward
        </Card.Header>
            <br />
            {isParosActive ?
                <div>
                    <h5>Paros reward can only be claimed at the end of the Paros epoch. The competition will end on {endTime}</h5>
                </div> :
                <div>
                    <h5>Paros has ended. You can now claim your reward. By clicking the below button, the shared of your fund will be transfered back to your account and redeemed. The underlying assets of your fund will then be transfered to your manager address.</h5>
                    <Button basic color="black" style={{ width: '100%' }} onClick={claimReward}>
                        Claim my shares and redeem!
        </Button>
                </div>


            }

        </Card.Content>
    </Card >
);

export default ClaimRewardParos;
