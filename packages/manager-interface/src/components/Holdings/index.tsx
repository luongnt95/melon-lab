import Holdings from '~/components/Holdings';
import { compose, withPropsOnChange, withHandlers } from 'recompose';
import displayNumber from '~/utils/displayNumber';
import * as R from 'ramda';
import Router from 'next/router';
import { toBigNumber } from './../../utils/functionalBigNumber';

// TODO: Add isReadyToTrade

const withHanndlers = withHandlers({
  onClick: props => asset => {
    Router.push({
      pathname: '/manage',
      query: { address: props.address, base: asset.symbol, quote: 'WETH-T' },
    });
  },
});

const mapHoldings = R.curryN(2, (nav, asset) => ({
  ...asset,
  price: displayNumber(asset.price),
  fraction: displayNumber(
    toBigNumber(asset.balance)
      .times(asset.price)
      .div(nav.toString() || 1)
      .times(100),
  ),
  balance: displayNumber(asset.balance),
}));

const withMappedProps = withPropsOnChange(['holdings'], props => ({
  holdings:
    props.holdings && props.holdings.map(mapHoldings(props.nav)),
}));

export default compose(
  withMappedProps,
  withHanndlers,
)(Holdings);
