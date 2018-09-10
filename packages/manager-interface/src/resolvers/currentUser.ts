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
      return '0x8F1C6BCe6c18DD8f5e6e7701627Ccf8e045DBa2a';
    },
  },
};
