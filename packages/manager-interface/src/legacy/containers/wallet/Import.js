import { connect } from 'react-redux';
import { actions as routeActions } from '../../actions/routes';
import { actions as walletActions } from '../../actions/wallet';
import Import from '@melonproject/manager-components/components/ImportWallet';

const mapStateToProps = state => ({
  mnemonic: state.wallet.mnemonic,
});

const mapDispatchToProps = dispatch => ({
  goToAccount: () => dispatch(routeActions.wallet()),
  parseWallet: files => {
    var reader = new FileReader();

    reader.onloadend = function() {
      dispatch(walletActions.importWallet(reader.result));
    };

    reader.onerror = function(error) {
      dispatch(walletActions.importWalletFailed(error));
    };

    reader.readAsBinaryString(files[0]);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Import);
