export default {
  Query: {
    isSyncing: (parent, args, { loaders }) => {
      return loaders.isSyncing();
    },
    isDataValid: (parent, args, { loaders }) => {
      return loaders.isDataValid();
    },
    isNetworkValid: async (parent, args, { loaders }) => {
      const network = await loaders.ethereumNetwork();
      return network === '42' || network === '1';
    },
    currentBlock: (parent, args, { loaders }) => {
      return loaders.currentBlock();
    },
    ethereumNetwork: (parent, args, { loaders }) => {
      return loaders.ethereumNetwork();
    },
    ethBalance: async (parent, args, { loaders }) => {
      const address = await loaders.accountAddress();
      return address && await loaders.etherBalance(address);
    },
    wethBalance: async (parent, args, { loaders }) => {
      const address = await loaders.accountAddress();
      return address && await loaders.nativeBalance(address);
    },
    mlnBalance: async (parent, args, { loaders }) => {
      const address = await loaders.accountAddress();
      return address && await loaders.melonBalance(address);
    },
    accountAddress: (parent, args, { loaders }) => {
      return loaders.accountAddress();
    },
  },
};
