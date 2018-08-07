import { connect } from 'react-redux';
import { actions } from '../actions/fund';
import TermsAndConditions from '@melonproject/manager-components/components/TermsAndConditions';

const mapStateToProps = state => ({
  networkId: state.ethereum.network,
});

const mapDispatchToProps = dispatch => ({
  sign: () => dispatch(actions.signRequested()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsAndConditions);
