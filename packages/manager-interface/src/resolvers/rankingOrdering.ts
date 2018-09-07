import gql from 'graphql-tag';

export default {
  Mutation: {
    rankingOrdering: (parent, args, { cache }) => {
      const query = gql`
        query RankingOrderingQuery {
          rankingOrdering @client
        }
      `;

      cache.writeQuery({ query, data: {
        rankingOrdering: args.order,
      }});

      return args.order;
    },
  },
};
