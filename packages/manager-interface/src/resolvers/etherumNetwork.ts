export default {
  Query: {
    ethereumNetwork: async (parent, args, { environment }) => {
      return await environment.api.net.version();
    },
  },
};
