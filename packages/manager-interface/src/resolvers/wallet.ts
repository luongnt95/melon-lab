export default {
  Query: {
    mnemonic: (parent, args, { loaders }) => {
      return loaders.getMnemonic();
    },
  },
};
