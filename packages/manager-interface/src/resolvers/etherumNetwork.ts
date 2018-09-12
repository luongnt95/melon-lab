export default {
  Query: {
    isSyncing: (parent, args, { loaders }) => {
      return loaders.isSyncing();
    },
    isDataValid: (parent, args, { loaders }) => {
      return loaders.isDataValid();
    },
    currentBlock: (parent, args, { loaders }) => {
      return loaders.currentBlock();
    },
    ethereumNetwork: (parent, args, { loaders }) => {
      return loaders.ethereumNetwork();
    },
    ethBalance: async (parent, args, { loaders }) => {
      const address = await loaders.accountAddress();
      const balance = address && await loaders.etherBalance(address);
      return balance && balance.toString();
    },
    wethBalance: async (parent, args, { loaders }) => {
      const address = await loaders.accountAddress();
      const balance = address && await loaders.nativeBalance(address);
      return balance && balance.toString();
    },
    mlnBalance: async (parent, args, { loaders }) => {
      const address = await loaders.accountAddress();
      const balance = address && await loaders.melonBalance(address);
      return balance && balance.toString();
    },
    accountAddress: (parent, args, { loaders }) => {
      return loaders.accountAddress();
    },
    canonicalPriceFeedAddress: (parent, args, { config }) => {
      return config.canonicalPriceFeedAddress;
    },
    competitionComplianceAddress: (parent, args, { config }) => {
      return config.competitionComplianceAddress;
    },
    onlyManagerCompetitionAddress: (parent, args, { config }) => {
      return config.onlyManagerCompetitionAddress;
    },
    mnemonic: (parent, args, { loaders }) => {
      return loaders.mnemonic();
      // return 'abc abc';
    },
  },
};
