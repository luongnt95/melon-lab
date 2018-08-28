import moment from 'moment';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import Ranking from '@melonproject/manager-components/components/Ranking';
import { actions } from '../actions/ranking';
import displayNumber from '../utils/displayNumber';
import { actions as routeActions } from '../actions/routes';
import { greaterThan } from '../utils/functionalBigNumber';
import { networks } from '@melonproject/melon.js';

const mapStateToProps = state => ({
  rankingList: state.ranking.rankingList
    .filter(fund =>
      fund.name
        .toLocaleLowerCase()
        .includes(state.ranking.search.toLocaleLowerCase()),
    )
    .map(fund => ({
      ...fund,
      inception: moment(fund.inception).format('D. MMM YYYY HH:mm'),
      sharePrice: displayNumber(fund.sharePrice.toString()),
      reportUrl: `https://${
        state.ethereum.network === networks.KOVAN ? 'melon' : 'olympiad'
      }-reporting.now.sh/report/${fund.address}`,
    }))
    .sort((a, b) => {
      const { ordering } = state.ranking;
      if (ordering === '+rank') {
        return greaterThan(a.rank, b.rank) ? 1 : -1;
      } else if (ordering === '-rank') {
        return greaterThan(b.rank, a.rank) ? 1 : -1;
      } else if (ordering === '+price') {
        return greaterThan(a.sharePrice, b.sharePrice) ? 1 : -1;
      } else if (ordering === '-price') {
        return greaterThan(b.sharePrice, a.sharePrice) ? 1 : -1;
      } else if (ordering === '+inception') {
        return new Date(a.inception) > new Date(b.inception) ? 1 : -1;
      } else if (ordering === '-inception') {
        return new Date(b.inception) > new Date(a.inception) ? 1 : -1;
      }
      return 0;
    }),
  search: state.ranking.search,
  usersFund: state.app.usersFund,
  getFundLinkAction: fundAddress => routeActions.fund(fundAddress),
  loading: state.ranking.loading,
  ordering: state.ranking.ordering,
});

const mapDispatchToProps = dispatch => ({
  getRanking: () => dispatch(actions.getRanking()),
  onFilterChange: e => {
    dispatch(actions.setSearch(e.target.value));
  },
  setOrdering: ordering => dispatch(actions.setOrdering(ordering)),
  goToFund: fundAddress => dispatch(routeActions.fund(fundAddress)),
});

const RankingWithLifecycle = lifecycle({
  componentDidMount() {
    this.props.getRanking();
  },
})(Ranking);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RankingWithLifecycle);
