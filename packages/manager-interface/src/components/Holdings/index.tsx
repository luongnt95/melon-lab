import Holdings from '~/components/Holdings';
import { withPropsOnChange } from 'recompose';
import displayNumber from '~/utils/displayNumber';
import * as R from 'ramda';
import Link from 'next/link';
import StyledLink from '~/blocks/Link';

const mapHoldings = R.curryN(2, (address, holding) => ({
  ...holding,
  price: displayNumber(holding.price),
  fraction: displayNumber(holding.fraction),
  balance: displayNumber(holding.balance),
  Link: () => {
    // TODO: Add isReadyToTrade
    const isReadyToTrade = false;
    return (
      <Link
        href={{
          pathname: '/manage',
          query: { address: address, base: holding.symbol, quote: 'WETH-T' },
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
  holdings: props.holdings && props.holdings.map(mapHoldings(props.address)),
}));

export default withMappedProps(Holdings);
