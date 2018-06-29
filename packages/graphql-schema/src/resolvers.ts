import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import Order from './resolvers/Order';
import Orderbook from './resolvers/Orderbook';
import OrderbookEntry from './resolvers/OrderbookEntry';
import Quantity from './resolvers/Quantity';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription';
import Symbol from './resolvers/Symbol';

export default {
  DateTime,
  Query,
  Subscription,
  Symbol,
  Quantity,
  Orderbook,
  OrderbookEntry,
  Order,
};
