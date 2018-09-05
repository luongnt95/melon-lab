import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import Order from './resolvers/Order';
import Orderbook from './resolvers/Orderbook';
import OrderbookEntry from './resolvers/OrderbookEntry';
import Quantity from './resolvers/Quantity';
import Subscription from './resolvers/Subscription';
import Symbol from './resolvers/Symbol';

export default {
  DateTime,
  Query: {
    fund: require('./resolvers/Query/fund').default,
    funds: require('./resolvers/Query/funds').default,
    price: require('./resolvers/Query/price').default,
    openOrders: require('./resolvers/Query/openOrders').default,
  },
  Subscription,
  Symbol,
  Quantity,
  Orderbook,
  OrderbookEntry,
  Order,
};
