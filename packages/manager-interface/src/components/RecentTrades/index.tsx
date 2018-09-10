import moment from 'moment';
import { compose, withPropsOnChange } from 'recompose';
import RecentTrades from '@melonproject/manager-components/components/RecentTrades';
import displayNumber from '../../utils/displayNumber';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const withMappedTrades = withPropsOnChange(['trades'], props => ({
  trades: props.trades.map(trade => ({
    ...trade,
    price: displayNumber(trade.price),
    quantity: displayNumber(trade.quantity),
    timestamp: moment(trade.timestamp).format('D. MMM YYYY HH:mm'),
  })),
}));

const query = gql`
  query RecentTradesQuery(
    $baseTokenSymbol: String!
    $quoteTokenSymbol: String!
  ) {
    recentTrades(
      baseTokenSymbol: $baseTokenSymbol
      quoteTokenSymbol: $quoteTokenSymbol
    ) {
      price
      quantity
      timestamp
      type
    }
  }
`;

const withRecentTrades = BaseComponent => baseProps => (
  <Query
    query={query}
    variables={{
      baseTokenSymbol: baseProps.baseAsset,
      quoteTokenSymbol: baseProps.quoteAsset,
    }}
    ssr={false}
  >
    {props => (
      <BaseComponent
        {...baseProps}
        trades={(props.data && props.data.recentTrades) || []}
        loading={props.loading}
      />
    )}
  </Query>
);

export default compose(
  withRecentTrades,
  withMappedTrades,
)(RecentTrades);
