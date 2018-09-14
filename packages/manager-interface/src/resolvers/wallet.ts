export default {
  Mutation: {
    storeWallet: (parent, args, { loaders }) => {
      return loaders.storeWallet(args);
    },
  },
  Query: {
    mnemonic: (parent, args, { loaders }) => {
      return loaders.getMnemonic();
    },
  },
};
