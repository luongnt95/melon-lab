import { takeLatest, call, put, take, select } from 'redux-saga/effects';
import slugify from 'slugify';
import gql from 'graphql-tag';

import {
  getEnvironment,
  getWallet,
  setupFund,
  signTermsAndConditions,
  signCompetitionTermsAndConditions,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';
import { createClient } from '~/wrappers/withApollo';

import { track } from '~/legacy/utils/track';
import { types, actions } from '../actions/fund';
import { actions as appActions, types as appTypes } from '../actions/app';
import {
  actions as rankingActions,
  types as rankingTypes,
} from '../actions/ranking';
import {
  types as routeTypes,
  actions as routeActions,
} from '../actions/routes';
import signer from './signer';

function* sign() {
  try {
    yield put(modalActions.loading());
    yield put(
      modalActions.confirm({
        body: `Please confirm that you read and understood the terms and conditions.`,
      }),
    );
    const action = yield take([modalTypes.CONFIRMED, modalTypes.CANCEL]);
    if (action.type === modalTypes.CANCEL) return false;
    yield put(modalActions.loading());
    const privateKey = yield select(state => state.wallet.privateKey);
    const environment = getEnvironment();
    environment.account = getWallet(privateKey);
    const signature = yield call(signTermsAndConditions, environment);
    yield put(actions.signSucceeded(signature));
    yield put(modalActions.close());
  } catch (err) {
    yield put(modalActions.error(err.message));
    yield put(actions.signFailed(signature));
    console.error(err);
    console.log(JSON.stringify(err, null, 4));
  }
}

function* signCompetition() {
  try {
    yield put(modalActions.loading());
    yield put(
      modalActions.confirm({
        body: `Please confirm that you read and understood the terms and conditions.`,
      }),
    );
    const action = yield take([modalTypes.CONFIRMED, modalTypes.CANCEL]);
    if (action.type === modalTypes.CANCEL) return false;
    yield put(modalActions.loading());
    const privateKey = yield select(state => state.wallet.privateKey);
    const environment = getEnvironment();
    environment.account = getWallet(privateKey);
    const competitionSignature = yield call(
      signCompetitionTermsAndConditions,
      environment,
    );
    yield put(actions.signCompetitionSucceeded(competitionSignature));
    yield put(modalActions.close());
  } catch (err) {
    yield put(modalActions.error(err.message));
    yield put(actions.signCompetitionFailed(signature));
    console.error(err);
    console.log(JSON.stringify(err, null, 4));
  }
}
const query = gql`
  query FundNamesQuery {
    funds {
      name
    }
  }
`;

function* createFund({ name, OasisDex, ZeroEx }) {
  const client = yield call(createClient, {});
  const response = yield call(client.query, {
    query,
  });

  const ranking = response && response.data && response.data.funds;
  if (ranking.find(fund => slugify(fund.name) === slugify(name))) {
    yield put(modalActions.error('Fund with similar name already registered'));
    return;
  }

  let exchangeNames = [];
  if (OasisDex) exchangeNames.push('MatchingMarket');
  if (ZeroEx) exchangeNames.push('ZeroExExchange');

  function* transaction(environment) {
    const signature = yield select(state => state.fund.signature);
    const fund = yield call(setupFund, environment, {
      name,
      signature,
      exchangeNames,
    });
    yield put(
      actions.setupSucceeded({ ...fund, owner: environment.account.address }),
    );
    yield put(appActions.setUsersFund(fund.address));
    yield put(routeActions.setup());
    yield put(modalActions.close());
    yield put(actions.infoRequested(fund.address));
  }

  yield call(
    signer,
    `Please confirm to setup your fund with the name ${name} and to sign our terms and conditions:`,
    transaction,
    actions.setupFailed,
  );
}

function* loadFundOnSetup() {
  const usersFundChecked = yield select(state => state.app.usersFundChecked);
  if (!usersFundChecked) yield take(appTypes.SET_USERS_FUND);

  const hasAccount = yield select(state => !!state.ethereum.account);
  const usersFund = yield select(state => state.app.usersFund);

  if (!hasAccount) {
    yield put(routeActions.wallet());
  } else if (usersFund) {
    yield put(actions.infoRequested(usersFund));
  }
}

function* setup() {
  yield takeLatest(types.SIGN_REQUESTED, sign);
  yield takeLatest(types.SIGN_COMPETITION_REQUESTED, signCompetition);
  yield takeLatest(types.SETUP_REQUESTED, createFund);
  yield takeLatest(routeTypes.SETUP, loadFundOnSetup);
}

export default setup;
