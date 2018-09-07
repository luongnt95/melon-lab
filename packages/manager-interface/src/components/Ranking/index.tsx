import { networks } from '@melonproject/melon.js';
import moment from 'moment';
import { compose, withPropsOnChange } from 'recompose';
import Ranking from '~/components/Ranking';
import displayNumber from '~/utils/displayNumber';
import { greaterThan } from '~/utils/functionalBigNumber';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import * as R from 'ramda';
import Link from 'next/link';

const filterRankings = R.curryN(2, (search, fund) => {
  return fund.name.toLocaleLowerCase().includes(search);
});

const mapRankings = R.curryN(2, (network, fund) => ({
  ...fund,
  inception: moment(fund.inception).format('D. MMM YYYY HH:mm'),
  sharePrice: displayNumber(fund.sharePrice),
  reportUrl: `https://${
    network === networks.KOVAN ? 'melon' : 'olympiad'
  }-reporting.now.sh/report/${fund.address}`,
}));

const sortRankings = ordering => (a, b) => {
  if (ordering === '+rank') {
    return greaterThan(a.rank, b.rank) ? 1 : -1;
  }

  if (ordering === '-rank') {
    return greaterThan(b.rank, a.rank) ? 1 : -1;
  }

  if (ordering === '+price') {
    return greaterThan(a.sharePrice, b.sharePrice) ? 1 : -1;
  }

  if (ordering === '-price') {
    return greaterThan(b.sharePrice, a.sharePrice) ? 1 : -1;
  }

  if (ordering === '+inception') {
    return new Date(a.inception) > new Date(b.inception) ? 1 : -1;
  }

  if (ordering === '-inception') {
    return new Date(b.inception) > new Date(a.inception) ? 1 : -1;
  }

  return 0;
};

const withFilteringAndSorting = withPropsOnChange(
  ['loading', 'funds', 'search', 'ordering', 'network'],
  props => ({
    funds: !props.loading && props.funds.slice()
      .filter(filterRankings(props.search.toLocaleLowerCase()))
      .map(mapRankings(props.network))
      .sort(sortRankings(props.ordering)),
  }),
);

const rankingQuery = gql`
  query RankingQuery {
    ethereumNetwork @client
    rankingOrdering @client
    rankingSearchString @client

    funds {
      rank
      address
      name
      sharePrice
      inception
    }
  }
`;

const rankingOrderingMutation = gql`
  mutation RankingOrderingMutation($order: String!) {
    rankingOrdering(order: $order) @client
  }
`;

const rankingSearchMutation = gql`
  mutation RankingSearchMutation($search: String!) {
    rankingSearchString(search: $search) @client
  }
`;

const withRanking = BaseComponent => baseProps => (
  <Mutation mutation={rankingSearchMutation}>
    {(setRankingSearch) => (
      <Mutation mutation={rankingOrderingMutation}>
        {(setRankingOrder) => (
          <Query query={rankingQuery} ssr={false}>
          {props => (
            <BaseComponent
              setOrdering={(order) => setRankingOrder({ variables: { order }})}
              setSearch={(search) => setRankingSearch({ variables: { search }})}
              funds={props.data && props.data.funds}
              ordering={props.data && props.data.rankingOrdering}
              search={props.data && props.data.rankingSearchString}
              network={props.data && props.data.ethereumNetwork}
              loading={props.loading}
              Link={({ children, address }) => (
                <Link href={`/manage?address=${address}&base=MLN-T&quote=WETH-T`}>{children}</Link>
              )}
            />
          )}
          </Query>
        )}
      </Mutation>
    )}
  </Mutation>
);

export default compose(
  withRanking,
  withFilteringAndSorting,
)(Ranking);
