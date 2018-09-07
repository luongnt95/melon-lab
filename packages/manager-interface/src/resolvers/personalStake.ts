import { getParticipation } from '@melonproject/melon.js';
import gql from 'graphql-tag';

export default {
  Fund: {
    personalStake: async (parent, args, { environment, cache }) => {
      if (!parent.address) {
        return null;
      }

      const query = gql`
        query CurrentUserQuery {
          currentUser @client {
            ethereumAddress
          }
        }
      `;

      const result = cache.readQuery({ query });
      if (!result.currentUser || !result.currentUser.ethereumAddress) {
        return null;
      }

      const participation = await getParticipation(environment, {
        fundAddress: parent.address,
        investorAddress: result.currentUser.ethereumAddress,
      });

      return participation && participation.personalStake;
    },
  },
};
