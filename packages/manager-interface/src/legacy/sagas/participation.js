import { takeLatest, select, call, put } from 'redux-saga/effects';
import {
    invest,
    redeem,
    executeRequest,
    redeemAllOwnedAssets,
    getLastRequest,
    registerForCompetition,
    signOlympiadTermsAndConditions,
    claimReward,
    getParticipation
} from '@melonproject/melon.js';
import { delay } from 'redux-saga';
import { types, actions } from '../actions/participation';
import { actions as fundActions, types as fundTypes } from '../actions/fund';
import { actions as modalActions } from '../actions/modal';
import { actions as routesActions } from '../actions/routes';
import signer from './signer';

function* investSaga(action) {
    const quoteAsset = yield select(state => state.fund.config.quoteAssetSymbol)
    function* transaction(environment) {
        const fundAddress = yield select(state => state.fund.address);
        const subscription = yield call(invest, environment, {
            fundAddress,
            numShares: action.amount,
            offeredValue: action.total,
            isNativeAsset: true,
        });
        if (action.directlyExecute) {
            yield call(executeRequest, environment, {
                id: subscription.id,
                fundAddress,
            });
            yield put(routesActions.fund(fundAddress));
        } else {
            const pendingRequest = yield call(getLastRequest, environment, {
                fundAddress,
            });
            yield put(fundActions.setPendingRequest(pendingRequest));
        }
        yield put(actions.investSucceeded());
        yield put(modalActions.close());
    }

    yield call(
        signer,
        `Do you really want to buy ${action.amount} shares for ${
        action.total
        } ${quoteAsset}`,
        transaction,
        actions.investFailed,
    );
}

function* redeemSaga(action) {
    function* transaction(environment) {
        const fundAddress = yield select(state => state.fund.address);
        yield call(redeem, environment, {
            fundAddress,
            numShares: action.amount,
            requestedValue: action.total,
        });
        const pendingRequest = yield call(getLastRequest, environment, {
            fundAddress,
        });
        yield put(fundActions.setPendingRequest(pendingRequest));
        yield put(actions.redeemSucceeded());
        yield put(modalActions.close());
    }

    yield call(
        signer,
        `Do you really want to sell ${action.amount} shares for ${
        action.total
        } MLN?`,
        transaction,
        actions.redeemFailed,
    );
}

function* redeemAllOwnedAssetsSaga(action) {
    function* transaction(environment) {
        const fundAddress = yield select(state => state.fund.address);
        yield call(redeemAllOwnedAssets, environment, {
            fundAddress,
            numShares: action.amount,
        });
        yield put(actions.redeemAllOwnedAssetsSucceeded());
        yield put(modalActions.close());
    }

    yield call(
        signer,
        `Do you really want to immediately redeem ${
        action.amount
        } shares? You will receive a subset of the current fund holdings, proportionally to your requested number of shares.`,
        transaction,
        actions.redeemAllOwnedAssetsFailed,
    );
}

function* claimRewardSaga(action) {
    function* transaction(environment) {
        const reward = yield call(claimReward, environment)
        const fundAddress = yield select(state => state.fund.address);
        const sharesOwned = yield call(getParticipation, environment, { fundAddress, investorAddress: environment.account.address })
        yield call(redeemAllOwnedAssets, environment, {
            fundAddress,
            numShares: sharesOwned.personalStake,
        });
        yield put(actions.claimRewardSucceeded());
        yield put(modalActions.close());
    }

    yield call(
        signer,
        `Do you really want to claim your reward and redeem the underlying assets of your fund to your manager address?`,
        transaction,
        actions.claimRewardFailed,
    );
}


function* executeSaga({ id }) {
    function* transaction(environment) {
        const fundAddress = yield select(state => state.fund.address);

        yield call(executeRequest, environment, { id, fundAddress });
        yield put(actions.executeSucceeded());
        yield put(modalActions.close());
    }

    yield call(
        signer,
        `Please confirm the execution of your participation request:`,
        transaction,
        actions.executeFailed,
    );
}

function* waitForExecute({ pendingRequest: { canBeExecutedInMs } }) {
    yield delay(canBeExecutedInMs);
    yield put(fundActions.setReadyToExecute());
}

function* contributeSaga(action) {
    function* transaction(environment) {
        const fundAddress = yield select(state => state.fund.address);
        const signature = yield call(signOlympiadTermsAndConditions, environment)
        const contribution = yield call(registerForCompetition, environment, {
            fundAddress,
            signature,
            buyInValue: action.amount
        });

        yield put(actions.contributeSucceeded());
        yield put(modalActions.close());
        yield put(routesActions.fund(fundAddress))
    }

    yield call(
        signer,
        `Please confirm you wish to contribute ${action.amount} ETH to the Paros Contract. By proceeding, you are cryptographically signing the terms and conditions associated with the Paros Olympiad and sending ${action.amount} ETH to the Paros Contract. `,
        transaction,
        actions.contributeFailed,
    );
}

function* participation() {
    yield takeLatest(types.INVEST_REQUESTED, investSaga);
    yield takeLatest(types.REDEEM_REQUESTED, redeemSaga);
    yield takeLatest(
        types.REDEEM_ALL_OWNED_ASSETS_REQUESTED,
        redeemAllOwnedAssetsSaga,
    );
    yield takeLatest(
        types.CLAIM_REWARD_REQUESTED,
        claimRewardSaga,
    );
    yield takeLatest(types.EXECUTE_REQUESTED, executeSaga);
    yield takeLatest(fundTypes.SET_PENDING_REQUEST, waitForExecute);
    yield takeLatest(types.CONTRIBUTE_REQUESTED, contributeSaga);
}

export default participation;
