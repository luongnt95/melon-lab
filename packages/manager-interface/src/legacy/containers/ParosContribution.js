import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";
import { actions } from "../actions/participation";
import ParosContribution from "../components/organisms/ParosContributionForm";
import { actions as fundActions } from "../actions/fund";
import { multiply, divide, equals } from "../utils/functionalBigNumber";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
    onboardingState: state.app.onboardingState,
    usersFund: state.app.usersFund,
    fundAddress: state.fund.address,
    dataValid: state.ethereum.isDataValid,
    initialValues: {
        amount: 1,
        total: 20
    },
    displayNumber,
    melonAssetSymbol: state.fund.config.melonAssetSymbol,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestFund: fundAddress => dispatch(fundActions.infoRequested(fundAddress)),
    onChange: (values, _dispatch, props, previousValues) => {
        const changed = Object.keys(values).reduce(
            (acc, key) => (values[key] !== previousValues[key] ? [key, ...acc] : acc),
            [],
        );
        if (changed.includes("amount")) {
            const total = multiply(values.amount, 20);

            if (values.total !== total)
                dispatch(change("parosContribution", "total", total));
        } else if (changed.includes("total")) {
            const amount = divide(values.total, 20)
            if (amount !== values.amount)
                dispatch(change("parosContribution", "amount", amount))
        }
    },
    onSubmit: values => {
        dispatch(actions.contribute({ ...values }));

    },
});

const ParosContributionForm = reduxForm({
    form: "parosContribution",
    enableReinitialize: true,
})(ParosContribution);

const ParosContributionRedux = connect(mapStateToProps, mapDispatchToProps)(
    ParosContributionForm,
);

export default ParosContributionRedux;
