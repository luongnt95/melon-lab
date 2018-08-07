import { connect } from 'react-redux';
import { actions as routeActions } from '../../actions/routes';
import Generate from '@melonproject/manager-components/components/GenerateWallet';

const mapStateToProps = state => ({
  mnemonic: state.wallet.mnemonic,
});

const mapDispatchToProps = dispatch => ({
  restore: () => dispatch(routeActions.walletRestore({ onboarding: true })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Generate);
