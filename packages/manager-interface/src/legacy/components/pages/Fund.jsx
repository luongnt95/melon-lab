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
import FundTemplate from '@melonproject/manager-components/templates/Fund';
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
}) => {
  return (
    <div className="App">
      <Layout>
        {!hasContributed &&
        isCompetition &&
        isCompetitionActive &&
        isManager ? (
          <ParosContributionContainer />
        ) : (
          <FundTemplate
            tradeInfo={[
              <Factsheet />,
              isCompetition &&
                hasContributed &&
                isManager && <ClaimRewardParos />,
              !isCompetition && !isManager && <GetStarted />,
              !isCompetition &&
                canInvest &&
                !pendingRequest && <Participation />,
              !isCompetition &&
                canInvest &&
                pendingRequest && <ExecuteRequest />,
              !isCompetition && !canInvest && <Card />,
            ]}
            holdings={<Holdings />}
            orderForm={<OrderForm {...orderForm} onSubmit={onSubmit} />}
            orderbook={<Orderbook />}
            openOrders={<OpenOrders />}
            recentTrades={<RecentTrades />}
          />
        )}
      </Layout>
    </div>
  );
};

export default Fund;
