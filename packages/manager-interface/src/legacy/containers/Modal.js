import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import Modal from '../components/pages/Modal';
import { actions, interactions } from '../actions/modal';
import { getEnvironment, setEnvironment } from "@melonproject/melon.js"
const mapStateToProps = state => ({
    ...state.modal,
    type: state.modal.modalType,
});

const interactionDispatchMap = {
    [interactions.CANCEL]: () => actions.cancel(),
    // [interactions.CONFIRM]: () => actions.confirmed(),
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    interactionHandler: (event, interaction) => {
        // Hint: Submit is handled by the form, not as action. But we need to
        // prevent form submitting for the other actions.
        const action = interactionDispatchMap[interaction];
        if (action) {
            event.preventDefault();
            dispatch(action());
        }
    },
    onAfterOpen: () => {
        ownProps.reset();
    },
});

const onSubmit = async (values, dispatch) => {
    if (values.gasPrice !== undefined && !values.password) {
        event.preventDefault();
        const environment = await getEnvironment();
        environment.gasPrice = values.gasPrice * 10 ** 9;
        await setEnvironment(environment)
        dispatch(actions.confirmed())
    } else if (values.password) {
        dispatch(actions.passwordEntered(values.password));
        dispatch(reset('modal'));
    } else {
        dispatch(actions.confirmed())
    }
};

const ModalRedux = connect(mapStateToProps, mapDispatchToProps)(Modal);

const ModalForm = reduxForm({
    form: 'modal',
    onSubmit,
})(ModalRedux);

export default ModalForm;
