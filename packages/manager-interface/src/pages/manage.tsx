import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { extractQueryParam } from '~/legacy/utils/parseUrl';
import isSameAddress from '~/legacy/utils/isSameAddress';
import Factsheet from '~/legacy/containers/Factsheet';
import Holdings from '~/legacy/containers/Holdings';
import OrderBook from '~/legacy/containers/Orderbook';
import RecentTrades from '~/legacy/containers/RecentTrades';
import GetStarted from '~/legacy/containers/GetStarted';
import Participation from '~/legacy/containers/Participation';
import ExecuteRequest from '~/legacy/containers/ExecuteRequest';
import OpenOrders from '~/legacy/containers/OpenOrders';
import ClaimRewardCompetition from '~/legacy/containers/ClaimRewardCompetition';
import OrderForm from '~/legacy/containers/OrderForm';
import ParosContribution from '~/legacy/containers/ParosContribution';
import FundTemplate from '@melonproject/manager-components/templates/Fund';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter } from 'next/router';

const Fund = ({
  isManager,
  canInvest,
  pendingRequest,
  isCompetition,
  hasContributed,
  isCompetitionActive,
  fund,
  loading,
}) => {
  return (
    <div className="App">
      {!hasContributed && isCompetition && isCompetitionActive && isManager ? (
        <ParosContribution />
      ) : (
        <FundTemplate
          tradeInfo={[
            <Factsheet {...fund} loading={loading} />,
            isCompetition &&
              hasContributed &&
              isManager && <ClaimRewardCompetition />,
            !isCompetition && !isManager && <GetStarted />,
            !isCompetition && canInvest && !pendingRequest && <Participation />,
            !isCompetition && canInvest && pendingRequest && <ExecuteRequest />,
          ]}
          holdings={<Holdings />}
          orderForm={<OrderForm />}
          orderbook={<OrderBook />}
          openOrders={<OpenOrders />}
          recentTrades={<RecentTrades />}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const isManager =
    props.fund &&
    state.app.isReadyToInteract &&
    isSameAddress(state.ethereum.account, props.fund.owner);
  const isCompetition = state.app.isCompetition;

  return {
    isVisitor: state.app.isReadyToVisit && !state.app.usersFund,
    isInvestor:
      props.fund &&
      state.app.isReadyToInteract &&
      !isSameAddress(state.ethereum.account, props.fund.owner),
    isManager,
    canInvest: state.app.isReadyToInteract,
    pendingRequest: state.app.pendingRequest,
    isCompetition,
    hasContributed: !props.fund || props.fund.totalSupply == 0 ? false : true,
    isCompetitionActive: props.fund && props.fund.isParosActive,
  };
};

const withState = connect(mapStateToProps);

const query = gql`
  query FundQuery($address: String!) {
    fund(address: $address) {
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
    }
  }
`;

const getAddress = extractQueryParam('address');
const withFund = BaseComponent => baseProps => (
  <Query
    query={query}
    variables={{
      address: getAddress(baseProps.router.asPath),
    }}
    ssr={false}
  >
    {props => (
      <BaseComponent
        {...baseProps}
        fund={props.data && props.data.fund}
        loading={props.loading}
      />
    )}
  </Query>
);

export default compose(
  withRouter,
  withFund,
  withState,
)(Fund);
