import app from './app';
import ethereum from './ethereum';
import fund from './fund';
import modal from './modal';
import orderbook from './orderbook';
import ranking from './ranking';
import recentTrades from './recentTrades';
import trade from './trade';
import wallet from './wallet';

const reducerMap = {
  app,
  ethereum,
  fund,
  modal,
  orderbook,
  ranking,
  recentTrades,
  trade,
  wallet,
};

export default reducerMap;
