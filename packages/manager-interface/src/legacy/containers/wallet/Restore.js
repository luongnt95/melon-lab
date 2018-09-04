import { connect } from 'react-redux';
import { importWalletFromMnemonic } from '@melonproject/melon.js';
import { actions } from '../../actions/wallet';
import RestoreWallet from '@melonproject/manager-components/components/RestoreWallet/container';
import Generate from '@melonproject/manager-components/components/GenerateWallet/container';

const mapStateToProps = state => ({
  initialValues: {
    mnemonic: '',
  },
  error: state.wallet.reason,
  generate: false,
});

const mapDispatchToProps = dispatch => ({
  onSubmitMnemonic: async values => {
    try {
      importWalletFromMnemonic(values.mnemonic);
      return dispatch(actions.restoreFromMnemonic(values.mnemonic));
    } catch (err) {
      return dispatch(
        actions.restoreFromMnemonicFailed('Invalid BIP39 mnemonic'),
      );
    }
  },
  onSubmitPassword: values => {
    dispatch(actions.passwordEntered(values.password));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Generate);
