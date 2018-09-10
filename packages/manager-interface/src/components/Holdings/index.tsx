import Holdings from '~/components/Holdings';
import { withPropsOnChange } from 'recompose';
import displayNumber from '~/utils/displayNumber';
import * as R from 'ramda';

const mapRankings = R.curryN(2, holding => ({
  ...holding,
  price: displayNumber(holding.price),
  fraction: displayNumber(holding.fraction),
  balance: displayNumber(holding.balance),
}));

const withMappedProps = withPropsOnChange(['holdings'], props => ({
  holdings: props.holdings && props.holdings.map(mapRankings),
}));

export default withMappedProps(Holdings);
