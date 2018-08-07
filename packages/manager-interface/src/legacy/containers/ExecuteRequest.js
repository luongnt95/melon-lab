import { connect } from 'react-redux';
import ExecuteRequest from '@melonproject/manager-components/components/ExecuteRequest';
import { actions } from '../actions/participation';

const mapStateToProps = state => ({
  readyToExecute: state.fund.readyToExecute,
  targetDate: new Date(
    Date.now() + state.fund.pendingRequest.canBeExecutedInMs,
  ),
  requestId: state.fund.pendingRequest.id,
});

const mapDispatchToProps = dispatch => ({
  onExecute: requestId => {
    dispatch(actions.execute(requestId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExecuteRequest);
