import gql from 'graphql-tag';

export default {
  Mutation: {
    rankingSearchString: (parent, args, { cache }) => {
      const query = gql`
        query RankingSearchStringQuery {
          rankingSearchString @client
        }
      `;

      cache.writeQuery({ query, data: {
        rankingSearchString: args.search,
      }});

      return args.search;
    },
  },
};
