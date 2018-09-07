export default {
  Query: {
    ethereumNetwork: (parent, args, { network }) => {
      return network;
    },
    isReadyToVisit: (parent, args, { network }) => {
      return network === '42' || network === '1';
    },
    isReadyToInteract: (parent, args, { network }) => {
      if (network !== '42' && network !== '1') {
        return false;
      }

    //   const isReadyToInteract =
    //   isReadyToVisit &&
    //   ethereum.blockNumber > 0 &&
    //   !ethereum.syncing &&
    //   !!ethereum.account &&
    //   !isZero(ethereum.ethBalance);
    //   }
    // },

      return true;
    },
  },
};
