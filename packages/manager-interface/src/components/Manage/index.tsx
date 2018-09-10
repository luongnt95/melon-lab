import React, { Fragment } from 'react';
import { compose } from 'recompose';
// import isSameAddress from '~/legacy/utils/isSameAddress';
// import Factsheet from '~/legacy/containers/Factsheet';
// import Holdings from '~/legacy/containers/Holdings';
// import OrderBook from '~/legacy/containers/Orderbook';
// import RecentTrades from '~/legacy/containers/RecentTrades';
// import GetStarted from '~/legacy/containers/GetStarted';
// import Participation from '~/legacy/containers/Participation';
// import ExecuteRequest from '~/legacy/containers/ExecuteRequest';
// import OpenOrders from '~/legacy/containers/OpenOrders';
// import ClaimRewardCompetition from '~/legacy/containers/ClaimRewardCompetition';
// import OrderForm from '~/legacy/containers/OrderForm';
// import ParosContribution from '~/legacy/containers/ParosContribution';
// import FundTemplate from '@melonproject/manager-components/templates/Fund';
import FundTemplate from '~/templates/Fund';
import FactSheet from '+/components/FactSheet';
import Orderbook from '+/components/Orderbook';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const Fund = ({
  isManager,
  canInvest,
  pendingRequest,
  isCompetition,
  hasContributed,
  isCompetitionActive,
  quoteAsset,
  baseAsset,
  fund,
  totalFunds,
  loading,
}) => (
  <Fragment>
    {!hasContributed && isCompetition && isCompetitionActive && isManager ? (
      // <ParosContribution />
      null
    ) : (
      <FundTemplate
        tradeInfo={[
          <FactSheet {...fund} quoteAsset={quoteAsset} numberOfFunds={totalFunds} loading={loading} />,
          // isCompetition &&
          //   hasContributed &&
          //   isManager && <ClaimRewardCompetition />,
          // !isCompetition && !isManager && <GetStarted />,
          // !isCompetition && canInvest && !pendingRequest && <Participation />,
          // !isCompetition && canInvest && pendingRequest && <ExecuteRequest />,
        ]}
        // holdings={<Holdings {...fund} />}
        // orderForm={<OrderForm holdings={(fund && fund.holdings) || []} />}
        orderbook={<Orderbook quoteAsset={quoteAsset} baseAsset={baseAsset} loading={loading} />}
        // openOrders={<OpenOrders />}
        // recentTrades={<RecentTrades />}
      />
    )}
  </Fragment>
);

// const mapStateToProps = (state, props) => {
//   const isManager =
//     props.fund &&
//     state.app.isReadyToInteract &&
//     isSameAddress(state.ethereum.account, props.fund.owner);

//   return {
//     isVisitor: state.app.isReadyToVisit && !state.app.usersFund,
//     isInvestor:
//       props.fund &&
//       state.app.isReadyToInteract &&
//       !isSameAddress(state.ethereum.account, props.fund.owner),
//     isManager,
//     canInvest: state.app.isReadyToInteract,
//     pendingRequest: state.app.pendingRequest,
//     isCompetition,
//     hasContributed: !props.fund || props.fund.totalSupply == 0 ? false : true,
//     isCompetitionActive: props.fund && props.fund.isParosActive,
//   };
// };

// const withState = connect(mapStateToProps);

const ethereumQuery = gql`
  query EthereumQuery {
    ethereumNetwork @client
  }
`;

const fundQuery = gql`
  query FundQuery($address: String!) {
    totalFunds
    fund(address: $address) {
      personalStake @client
      rank
      name
      managementReward
      performanceReward
      sharePrice
      totalSupply
      owner
      inception
      address
      gav
      nav
      holdings {
        symbol
        balance
        price
        fraction
      }
    }
  }
`;

const withFund = BaseComponent => baseProps => (
  <Query query={ethereumQuery} pollInterval={5000} ssr={false}>
    {props => (
      <Query
        query={fundQuery}
        variables={{
          address: baseProps.address,
        }}
        ssr={false}
      >
        {props => (
          <BaseComponent
            fund={props.data && props.data.fund}
            totalFunds={props.data && props.data.totalFunds}
            quoteAsset={baseProps.quote}
            baseAsset={baseProps.base}
            loading={props.loading}
          />
        )}
      </Query>
    )}
  </Query>
);

export default compose(
  withFund,
)(Fund);
