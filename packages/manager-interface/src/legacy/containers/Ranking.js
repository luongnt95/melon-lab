import moment from 'moment';
import { connect } from 'react-redux';
import { compose, withPropsOnChange } from 'recompose';
import Ranking from '@melonproject/manager-components/components/Ranking';
import { actions } from '../actions/ranking';
import displayNumber from '../utils/displayNumber';
import { actions as routeActions } from '../actions/routes';
import { greaterThan } from '../utils/functionalBigNumber';
import { networks } from '@melonproject/melon.js';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as R from 'ramda';

const mapStateToProps = (state, props) => ({
  search: state.ranking.search,
  ordering: state.ranking.ordering,
  network: state.ethereum.network,
  usersFund: state.app.usersFund,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: e => {
    dispatch(actions.setSearch(e.target.value));
  },
  setOrdering: ordering => dispatch(actions.setOrdering(ordering)),
  goToFund: fundAddress => dispatch(routeActions.fund(fundAddress)),
});

const withState = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const filterRankings = R.curryN(2, (search, fund) => {
  return fund.name.toLocaleLowerCase().includes(search);
});

const mapRankings = R.curryN(2, (network, fund) => ({
  ...fund,
  inception: moment(fund.inception).format('D. MMM YYYY HH:mm'),
  sharePrice: displayNumber(fund.sharePrice.toString()),
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
  ['rankingList', 'search', 'ordering', 'network'],
  props => ({
    rankingList: props.rankingList
      .filter(filterRankings(props.search.toLocaleLowerCase()))
      .map(mapRankings(props.network))
      .sort(sortRankings(props.ordering)),
  }),
);

const query = gql`
  query RankingQuery {
    funds {
      rank
      address
      name
      sharePrice
      inception
    }
  }
`;

const withRanking = BaseComponent => baseProps => (
  <Query query={query} ssr={false}>
    {props => (
      <BaseComponent
        {...baseProps}
        rankingList={props.data && props.data.funds || []}
        loading={props.loading}
      />
    )}
  </Query>
);

export default compose(
  withRanking,
  withState,
  withFilteringAndSorting,
)(Ranking);
