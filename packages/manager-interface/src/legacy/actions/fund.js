export const types = {
  SET: 'SET:fund:melon.fund',
  SHARE_PRICE_REQUESTED: 'SHARE_PRICE_REQUESTED:fund:melon.fund',
  SHARE_PRICE_SUCCEEDED: 'SHARE_PRICE_SUCCEEDED:fund:melon.fund',
  SHARE_PRICE_FAILED: 'SHARE_PRICE_FAILED:fund:melon.fund',
  SIGN_REQUESTED: 'SIGN_REQUESTED:fund:melon.fund',
  SIGN_SUCCEEDED: 'SIGN_SUCCEEDED:fund:melon.fund',
  SIGN_FAILED: 'SIGN_FAILED:fund:melon.fund',
  SIGN_COMPETITION_REQUESTED: 'SIGN_COMPETITION_REQUESTED:fund:melon.fund',
  SIGN_COMPETITION_SUCCEEDED: 'SIGN_COMPETITION_SUCCEEDED:fund:melon.fund',
  SIGN_COMPETITION_FAILED: 'SIGN_COMPETITION_FAILED:fund:melon.fund',
  NEEDS_TO_REGISTER: 'NEEDS_TO_REGISTER:fund:melon.fund',
  SETUP_REQUESTED: 'SETUP_REQUESTED:fund:melon.fund',
  SETUP_SUCCEEDED: 'SETUP_SUCCEEDED:fund:melon.fund',
  SETUP_FAILED: 'SETUP_FAILED:fund:melon.fund',
  UPDATE_RANKING: 'UPDATE_RANKING:fund:melon.fund',
  SET_PENDING_REQUEST: 'SET_PENDING_REQUEST:fund:melon.fund',
  READY_TO_EXECUTE: 'READY_TO_EXECUTE:fund:melon.fund',
  PROGRESSIVE_UPDATE: 'PROGRESSIVE_UPDATE:fund:melon.fund',
  SET_CONFIG: 'SET_CONFIG:fund:melon.fund',
};

export const actions = {
  set: address => ({
    type: types.SET,
    address,
  }),
  setupRequested: (name, OasisDex, ZeroEx) => ({
    type: types.SETUP_REQUESTED,
    name,
    OasisDex,
    ZeroEx,
  }),
  setupSucceeded: ({ id, address, name, timestamp, owner }) => ({
    type: types.SETUP_SUCCEEDED,
    id,
    address,
    name,
    timestamp,
    owner,
  }),
  setupFailed: ({ reason }) => ({
    type: types.SETUP_FAILED,
    reason,
  }),
  signRequested: () => ({
    type: types.SIGN_REQUESTED,
  }),
  signSucceeded: signature => ({
    type: types.SIGN_SUCCEEDED,
    signature,
  }),
  signFailed: ({ reason }) => ({
    type: types.SIGN_FAILED,
    reason,
  }),
  needsToRegister: () => ({
    type: types.NEEDS_TO_REGISTER,
    needsToRegister: true,
    showedRegistration: true,
  }),
  signCompetitionRequested: () => ({
    type: types.SIGN_COMPETITION_REQUESTED,
  }),
  signCompetitionSucceeded: competitionSignature => ({
    type: types.SIGN_COMPETITION_SUCCEEDED,
    competitionSignature,
  }),
  signCompetitionFailed: ({ reason }) => ({
    type: types.SIGN_COMPETITION_FAILED,
    reason,
  }),
  progressiveUpdate: data => ({
    type: types.PROGRESSIVE_UPDATE,
    ...data,
    loading: false,
  }),
  sharePriceRequested: () => ({
    type: types.SHARE_PRICE_REQUESTED,
  }),
  sharePriceFailed: ({ reason }) => ({
    type: types.SHARE_PRICE_FAILED,
    reason,
  }),
  sharePriceSucceeded: ({ sharePrice }) => ({
    type: types.SHARE_PRICE_SUCCEEDED,
    sharePrice,
  }),
  updateRanking: ({ rank, numberOfFunds, expectedPrize, isCompeting }) => ({
    type: types.UPDATE_RANKING,
    rank,
    numberOfFunds,
    expectedPrize,
    isCompeting,
  }),
  setPendingRequest: pendingRequest => ({
    type: types.SET_PENDING_REQUEST,
    pendingRequest,
    readyToExecute: false,
  }),
  setReadyToExecute: () => ({
    type: types.READY_TO_EXECUTE,
    readyToExecute: true,
  }),
  setConfig: config => ({
    type: types.SET_CONFIG,
    config,
  }),
};
