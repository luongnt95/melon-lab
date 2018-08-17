import { connect } from 'react-redux';
import { actions } from '../actions/participation';
import ContributionForm from '@melonproject/manager-components/components/ContributionForm/container';
import { actions as fundActions } from '../actions/fund';

const mapStateToProps = state => ({
  onboardingState: state.app.onboardingState,
  usersFund: state.app.usersFund,
  fundAddress: state.fund.address,
  dataValid: state.ethereum.isDataValid,
  initialValues: {
    amount: 1,
    total: 60,
  },
  melonAssetSymbol: state.fund.config
    ? state.fund.config.melonAssetSymbol
    : 'MLN',
});

const mapDispatchToProps = dispatch => ({
  requestFund: fundAddress => dispatch(fundActions.infoRequested(fundAddress)),
  onSubmit: values => {
    dispatch(actions.contribute({ ...values }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContributionForm);
