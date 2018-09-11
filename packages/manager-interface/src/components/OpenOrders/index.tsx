import moment from 'moment';
// import { connect } from 'react-redux';
import { compose, withPropsOnChange, withHandlers } from 'recompose';
// import { actions } from '../actions/openOrders';
import OpenOrders from '@melonproject/manager-components/components/OpenOrders';
import displayNumber from '../../utils/displayNumber';
// import isSameAddress from '../utils/isSameAddress';
import { extractQueryParam } from '~/legacy/utils/parseUrl';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'next/router';

// const mapStateToProps = state => ({
//   isReadyToTrade: state.app.isReadyToTrade,
//   isManager:
//     state.app.isReadyToInteract &&
//     isSameAddress(state.ethereum.account, state.fund.owner),
// });

// const mapDispatchToProps = dispatch => ({
//   onClick: (orderId, makerAssetSymbol, takerAssetSymbol) => {
//     dispatch(actions.cancelOrder(orderId, makerAssetSymbol, takerAssetSymbol));
//   },
// });

// const withState = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

const withMappedOrders = withPropsOnChange(['orders'], props => ({
  isManager: true,
  isReadyToTrade: true,
  orders: props.orders.map(order => ({
    ...order,
    price: displayNumber(order.price),
    buyHowMuch: displayNumber(order.buy.howMuch),
    buySymbol: order.buy.symbol,
    sellHowMuch: displayNumber(order.sell.howMuch),
    sellSymbol: order.sell.symbol,
    timestamp: moment(order.timestamp).format('D. MMM YYYY HH:mm'),
    type: order.type,
  })),
}));

const query = gql`
  query OpenOrdersQuery($address: String!) {
    openOrders(address: $address) {
      ... on OasisDexOrder {
        id
        isActive
        exchange
        exchangeContractAddress
        type
        price
        timestamp
        buy {
          howMuch
          symbol
        }
        sell {
          howMuch
          symbol
        }
      }
    }
  }
`;

const getAddress = extractQueryParam('address');

const withOpenOrders = BaseComponent => baseProps => (
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
        orders={(props.data && props.data.openOrders) || []}
        loading={props.loading}
      />
    )}
  </Query>
);

export default compose(
  withRouter,
  withOpenOrders,
  withMappedOrders,
  // withState,
)(OpenOrders);
