export const types = {
  SETUP: 'SETUP:routes:melon.fund',
  FUND: 'FUND:routes:melon.fund',
  RANKING: 'RANKING:routes:melon.fund',
  WALLET_GENERATE: 'WALLET_GENERATE:routes:melon.fund',
  WALLET_RESTORE: 'WALLET_RESTORE:routes:melon.fund',
  WALLET_IMPORT: 'WALLET_IMPORT:routes:melon.fund',
  WALLET: 'WALLET:routes:melon.fund',
  DONE: 'DONE:routes:melon.fund',
  RESTORE: 'RESTORE:routes:melon.fund',
  COMPETITION: 'COMPETITION:routes:melon.fund',
};

export const routeMap = {
  [types.RANKING]: '/',
  [types.SETUP]: '/setup',
  [types.WALLET_GENERATE]: '/wallet/generate',
  [types.WALLET_RESTORE]: '/wallet/restore',
  [types.WALLET_IMPORT]: '/wallet/import',
  [types.WALLET]: '/wallet',
  [types.FUND]: '/manage',
};

export const actions = {
  fund: address => ({
    type: types.FUND,
    payload: { query: { address } },
  }),
  ranking: () => ({
    type: types.RANKING,
  }),
  setup: () => ({
    type: types.SETUP,
  }),
  walletGenerate: () => ({
    type: types.WALLET_GENERATE,
  }),
  walletRestore: () => ({
    type: types.WALLET_RESTORE,
  }),
  walletImport: () => ({
    type: types.WALLET_IMPORT,
  }),
  wallet: onboarding => ({
    type: types.WALLET,
    query: onboarding ? { onboarding: true } : null,
  }),
};
