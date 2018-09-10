import isSameAddress from '~/utils/isSameAddress';

export default {
  Fund: {
    isManager: async (parent, args, { loaders }) => {
      const account = await loaders.accountAddress();
      return isSameAddress(parent.owner, account);
    },
    personalStake: async (parent, args, { loaders }) => {
      const investor = await loaders.accountAddress();
      if (!investor) {
        return null;
      }

      const participation = await loaders.getParticipation(parent.address, investor);
      return participation && participation.personalStake;
    },
  },
};
