import { connect } from 'react-redux';
import { actions as routeActions } from '../../actions/routes';
import Generate from '@melonproject/manager-components/components/GenerateWallet/container';
import { actions as walletAction } from '../../actions/wallet';
import { importWalletFromMnemonic } from '@melonproject/melon.js';

const mapStateToProps = state => ({
  generatedMnemonic: state.wallet.mnemonic,
  restoreWallet: {
    initialValues: {
      mnemonic: '',
    },
  },
  passwordForm: {
    initialValues: {
      password: '',
    },
  },
  error: state.wallet.reason,
});

const getWallet = mnemonic => importWalletFromMnemonic(mnemonic);

const mapDispatchToProps = dispatch => ({
  onSubmitMnemonic: async values => {
    try {
      importWalletFromMnemonic(values.mnemonic);
      return dispatch(walletAction.restoreFromMnemonic(values.mnemonic));
    } catch (err) {
      return dispatch(
        walletAction.restoreFromMnemonicFailed('Invalid BIP39 mnemonic'),
      );
    }
  },
  onSubmitPassword: values => {
    dispatch(walletAction.passwordEntered(values.password));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Generate);
