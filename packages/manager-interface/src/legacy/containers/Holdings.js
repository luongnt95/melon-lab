import { connect } from 'react-redux';
import { actions as appActions } from '../actions/app';
import Holdings from '@melonproject/manager-components/components/Holdings';
import displayNumber from '../utils/displayNumber';
import { compose, withPropsOnChange } from 'recompose';
import { toBigNumber } from './../utils/functionalBigNumber';

const mapStateToProps = state => ({
  dataValid: state.ethereum.isDataValid,
  isReadyToTrade: state.app.isReadyToTrade,
  quoteAsset: state.app.assetPair.quote,
});

const mapDispatchToProps = dispatch => ({
  selectAsset: (asset, isReadyToTrade, quoteAsset) => {
    if (asset !== quoteAsset) {
      dispatch(appActions.updateAssetPair({ base: asset }));
      if (isReadyToTrade) {
        dispatch(appActions.scrollTo('trade'));
      } else {
        dispatch(appActions.scrollTo('orderbook'));
      }
    }
  },
});

const withState = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withMappedOrders = withPropsOnChange(['holdings'], props => ({
  holdings:
    props.holdings &&
    props.holdings.map(asset => ({
      name: asset.symbol,
      balance: displayNumber(asset.balance),
      price: displayNumber(asset.price),
      // TODO: calculate percentage correct
      percentage: displayNumber(
        toBigNumber(asset.balance)
          .times(asset.price)
          .div(props.nav.toString() || 1)
          .times(100),
      ),
    })),
}));

export default compose(
  withMappedOrders,
  withState,
)(Holdings);
