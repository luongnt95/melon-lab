import Holdings from '~/components/Holdings';
import { withPropsOnChange } from 'recompose';
import displayNumber from '~/utils/displayNumber';
import * as R from 'ramda';
import Link from 'next/link';
import StyledLink from '~/blocks/Link';
import { toBigNumber } from './../../utils/functionalBigNumber';

const mapHoldings = R.curryN(3, (address, nav, asset) => ({
  ...asset,
  price: displayNumber(asset.price),
  fraction: displayNumber(
    toBigNumber(asset.balance)
      .times(asset.price)
      .div(nav.toString() || 1)
      .times(100),
  ),
  balance: displayNumber(asset.balance),
  Link: () => {
    // TODO: Add isReadyToTrade
    const isReadyToTrade = false;
    return (
      <Link
        href={{
          pathname: '/manage',
          query: { address: address, base: asset.symbol, quote: 'WETH-T' },
        }}
        passHref
      >
        <StyledLink style="secondary" size="small">
          {isReadyToTrade ? (
            <span>Buy / Sell</span>
          ) : (
            <span>See Orderbook</span>
          )}
        </StyledLink>
      </Link>
    );
  },
}));

const withMappedProps = withPropsOnChange(['holdings', 'address'], props => ({
  holdings:
    props.holdings && props.holdings.map(mapHoldings(props.address, props.nav)),
}));

export default withMappedProps(Holdings);
