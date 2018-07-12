import moment from "moment";
import { connect } from "react-redux";
import ClaimRewardParos from "../components/organisms/ClaimRewardParos";
import { actions } from "../actions/participation";

const mapStateToProps = state => ({
    isParosActive: state.fund.isParosActive,
    endTime: state.fund.parosEndTime && state.fund.parosEndTime !== "..."
        ? moment(state.fund.parosEndTime * 1000).format("D. MMM YYYY HH:mm")
        : "...",
});

const mapDispatchToProps = dispatch => ({
    claimReward: () => {
        dispatch(actions.claimRewards());
    },
});

const ClaimRewardParosContainer = connect(mapStateToProps, mapDispatchToProps)(
    ClaimRewardParos,
);

export default ClaimRewardParosContainer;
