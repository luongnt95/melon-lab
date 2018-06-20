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
import Trade from '../../containers/Trade';
import OpenOrders from '../../containers/OpenOrders';

const isCompetition =
  process.env.TRACK === tracks.KOVAN_COMPETITION ||
  process.env.TRACK === tracks.LIVE;

const Fund = ({ isManager, fundAddress, canInvest, pendingRequest }) => (
  <div className="App">
    <br />
    <div>
      <Card.Group>
        <Factsheet />

        {!isCompetition && (
          <div>
            {isManager ? <Administration /> : <GetStarted />}
            {canInvest && !pendingRequest ? <Participation /> : <div />}
            {canInvest && pendingRequest ? <ExecuteRequest /> : <div />}
            {!canInvest ? <Card /> : <div />}
          </div>
        )}
      </Card.Group>
      <br />
      <Holdings address={fundAddress} />
      <br />
      {isManager ? (
        <div>
          {' '}
          <Card.Group>
            <Trade />
            <TradeHelper />
          </Card.Group>
        </div>
      ) : (
        <div />
      )}
      <br />
      <Orderbook />
      <br />
      <OpenOrders address={fundAddress} />
      <br />
      <RecentTrades />
      <br />
      <TradeHistory address={fundAddress} />
    </div>
    <br />
  </div>
);

export default Fund;
