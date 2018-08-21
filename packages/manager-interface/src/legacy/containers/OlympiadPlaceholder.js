import { connect } from 'react-redux';
import { actions as routeActions } from '../actions/routes';
import OlympiadPlaceholder from '@melonproject/manager-components/components/OlympiadPlaceholder';

const mapStateToProps = state => ({
  address: state.ethereum.account,
});

const mapDispatchToProps = dispatch => ({
  goToGenerateAccount: () => dispatch(routeActions.walletGenerate()),
  goToAccount: () => dispatch(routeActions.account()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OlympiadPlaceholder);
