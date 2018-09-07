export default {
  Query: {
    currentUser: () => {
      return {
        __typename: 'User',
      };
    },
  },
  User: {
    ethereumAddress: () => {
      return '0x45786AF84843917F0a87475FfA096A90567Fe5De';
    },
  },
};
