import * as express from 'express';
import { getRanking } from '@melonproject/melon.js';
import * as Api from '@parity/api';

type Network = 'KOVAN' | 'LIVE';

function retrieveEndpoint(network: Network): string {
  if (network == 'LIVE') {
    return 'https://mainnet.melonport.com'
  } else if (network == 'KOVAN') {
    return 'https://kovan.melonport.com'
  }

  throw new Error(`Network ${network} not valid. Only 'LIVE' and 'KOVAN' allowed`);
}

const network = (process.env.NETWORK || 'KOVAN') as Network;
const api = new Api(new Api.Provider.Http(retrieveEndpoint(network), -1));
const port = parseInt(process.env.PORT as string, 10);
const app = express();

let ranking: any = {};
app.get('/', (req, res) => {
  res.json(ranking)
});

// Query interval for the ranking in miliseconds.
const interval = 20 * 1000;
async function refetchRanking(api): Promise<void> {
  ranking = await getRanking({ api });

  setTimeout(() => refetchRanking(api), interval);
}

async function start(port: number) {
  await refetchRanking(api);

  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on http://localhost:${port} for network ${network}`);
  });
}

start(port);
