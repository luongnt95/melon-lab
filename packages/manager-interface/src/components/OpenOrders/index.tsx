import moment from 'moment';
import { compose, withPropsOnChange, withHandlers } from 'recompose';
import OpenOrders from '@melonproject/manager-components/components/OpenOrders';
import displayNumber from '../../utils/displayNumber';
import { extractQueryParam } from '~/legacy/utils/parseUrl';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'next/router';

const withMappedOrders = withPropsOnChange(['orders'], props => ({
  // TODO: Add isManager and isReadyToTrade
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

const mutation = gql`
  mutation cancelOpenOrder(
    $orderId: String!
    $fundAddress: String!
    $makerAssetSymbol: String!
    $takerAssetSymbol: String!
  ) {
    cancelOpenOrder(
      orderId: $orderId
      fundAddress: $fundAddress
      makerAssetSymbol: $makerAssetSymbol
      takerAssetSymbol: $takerAssetSymbol
    ) {
      type
    }
  }
`;

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
      <Mutation mutation={mutation}>
        {(cancelOrder, { data }) => (
          <BaseComponent
            {...baseProps}
            orders={(props.data && props.data.openOrders) || []}
            loading={props.loading}
            onClick={(orderId, makerAssetSymbol, takerAssetSymbol) =>
              cancelOrder({
                variables: {
                  orderId,
                  fundAddress: getAddress(baseProps.router.asPath),
                  makerAssetSymbol,
                  takerAssetSymbol,
                },
              })
            }
          />
        )}
      </Mutation>
    )}
  </Query>
);

export default compose(
  withRouter,
  withOpenOrders,
  withMappedOrders,
)(OpenOrders);
