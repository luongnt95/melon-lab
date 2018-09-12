// @flow
import addressBook from '@melonproject/smart-contracts/addressBook';

import findEventInLog from '../../utils/ethereum/findEventInLog';
import ensure from '../../utils/generic/ensure';
import callOnExchange from './callOnExchange';
import getExchangeName from '../../exchange/utils/getExchangeName';
import getFundContract from '../contracts/getFundContract';
import getKyberProxyContract from '../../exchange/contracts/getKyberProxyContract';
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import getNetwork from '../../utils/environment/getNetwork';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const swapTokens = async (
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    srcTokenSymbol,
    destTokenSymbol,
    srcAmount,
    destAmount,
    identifier = '0x0'
  },
): Promise<Order> => {
  const config = await getConfig(environment);

  const network = await getNetwork(environment);
  if (!exchangeAddress) exchangeAddress = addressBook[network].KyberNetwork;
  const fundContract = await getFundContract(environment, fundAddress);
  const isShutDown = await fundContract.instance.isShutDown.call();
  const owner = await fundContract.instance.owner.call();

  const method = await getMethodNameSignature(environment, 'swapTokens');

  const orderUdateLog = await callOnExchange(environment, {
    fundContract,
    exchangeAddress,
    method,
    orderAddresses: ['0x0', '0x0', srcTokenSymbol, destTokenSymbol, '0x0'],
    orderValues: [srcAmount, destAmount, 0, 0, 0, 0, 0],
    identifier,
    signature: {},
  });

  const receipt = await environment.api.eth.getTransactionReceipt(orderUdateLog.transactionHash);
  const kyberProxyContract = await getKyberProxyContract(environment);
  const kyberLogs = await kyberProxyContract.parseEventLogs(receipt.logs);
  const executedEventLog = kyberLogs.find(log => log.event === 'ExecuteTrade' );
  
  return executedEventLog;
};

export default swapTokens;
