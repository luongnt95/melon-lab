import React from 'react';
import { Card } from 'semantic-ui-react';

import { tracks } from '@melonproject/melon.js';

import Factsheet from '../../containers/Factsheet';
import Holdings from '../../containers/Holdings';
import Administration from '../../containers/Administration';
import Orderbook from '../../containers/Orderbook';
import RecentTrades from '../../containers/RecentTrades';
import TradeHistory from '../../containers/TradeHistory';
import GetStarted from '../../containers/GetStarted';
import Participation from '../../containers/Participation';
import ExecuteRequest from '../../containers/ExecuteRequest';
import TradeHelper from '../../containers/TradeHelper';
import OpenOrders from '../../containers/OpenOrders';
import ClaimRewardParos from '../../containers/ClaimRewardParos';
import Layout from '@melonproject/manager-components/design/Layout';
import OrderForm from '@melonproject/manager-components/components/OrderForm/container';
import ParosContributionContainer from '../../containers/ParosContribution';

const Fund = ({
  isManager,
  fundAddress,
  canInvest,
  pendingRequest,
  isCompetition,
  orderForm,
  onSubmit,
  hasContributed,
  isCompetitionActive,
}) => (
    <div className="App">
      {!hasContributed && isCompetition && isCompetitionActive && isManager ? (
        <ParosContributionContainer />
      ) : (
          <div>
            <Layout>
              <Card.Group centered>
                <Factsheet />
                {isCompetition &&
                  hasContributed &&
                  isManager && <ClaimRewardParos />}
                {!isCompetition && !isManager && <GetStarted />}
                {!isCompetition &&
                  canInvest &&
                  !pendingRequest && <Participation />}
                {!isCompetition &&
                  canInvest &&
                  pendingRequest && <ExecuteRequest />}
                {!isCompetition && !canInvest && <Card />}
              </Card.Group>
              <br />
              <Holdings address={fundAddress} />
              <br />
              {isManager && (
                <Layout>
                  <h3>Trade</h3>
                  <OrderForm {...orderForm} onSubmit={onSubmit} />
                </Layout>
              )}
              <br />
              <Orderbook />
              <br />
              <OpenOrders address={fundAddress} />
              <br />
              <RecentTrades />
              <br />
            </Layout>
          </div>
        )}
    </div>
  );

export default Fund;
