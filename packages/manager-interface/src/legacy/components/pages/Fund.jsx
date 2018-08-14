import React, { Fragment } from 'react';
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
import ClaimRewardCompetition from '../../containers/ClaimRewardCompetition';
import FundTemplate from '@melonproject/manager-components/templates/Fund';
import OrderForm from '../../containers/OrderForm';
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
}) => {
  return (
    <div className="App">
      {!hasContributed && isCompetition && isCompetitionActive && isManager ? (
        <ParosContributionContainer />
      ) : (
        <FundTemplate
          tradeInfo={[
            <Factsheet />,
            isCompetition &&
              hasContributed &&
              isManager && <ClaimRewardCompetition />,
            !isCompetition && !isManager && <GetStarted />,
            !isCompetition && canInvest && !pendingRequest && <Participation />,
            !isCompetition && canInvest && pendingRequest && <ExecuteRequest />,
            !isCompetition && !canInvest && <Card />,
          ]}
          holdings={<Holdings />}
          orderForm={<OrderForm />}
          orderbook={
            <Fragment>
              <Orderbook />
            </Fragment>
          }
          openOrders={<OpenOrders />}
          recentTrades={<RecentTrades />}
        />
      )}
    </div>
  );
};

export default Fund;
