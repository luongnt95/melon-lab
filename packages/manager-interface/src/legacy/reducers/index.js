import app from './app';
import ethereum from './ethereum';
import fund from './fund';
import holdings from './holdings';
import modal from './modal';
import openOrders from './openOrders';
import orderbook from './orderbook';
import ranking from './ranking';
import recentTrades from './recentTrades';
import trade from './trade';
import tradeHistory from './tradeHistory';
import wallet from './wallet';

const reducerMap = {
  app,
  ethereum,
  fund,
  holdings,
  modal,
  openOrders,
  orderbook,
  ranking,
  recentTrades,
  trade,
  tradeHistory,
  wallet,
};

export default reducerMap;
