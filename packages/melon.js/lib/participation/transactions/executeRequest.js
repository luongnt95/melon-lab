// @flow
import BigNumber from 'bignumber.js';

import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../../fund/contracts/getFundContract';
import getParticipation from '../../participation/calls/getParticipation';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';
import toReadable from '../../assets/utils/toReadable';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Execute subscription/redemption request by `id` on fund at `fundAddress`
 * @returns number of allocated shares
 */
const executeRequest = async (
  environment: Environment,
  { id, fundAddress },
): Promise<BigNumber> => {
  const config = await getConfig(environment);
  const fundContract = await getFundContract(environment, fundAddress);
  const [
    participant,
    status,
    ,
    ,
    shareQuantity,
  ] = await fundContract.instance.requests.call({}, [id]);
  let executeRequestLogEntry;
  let receipt;

  /* Pre conditions
      1/ isShutDown
      2/ pre_cond(requests[id].status == RequestStatus.active)
      3/ pre_cond(requests[id].shareQuantity <= balances[requests[id].participant])
      4/ pre_cond(totalSupply == 0 || now >= add(requests[id].timestamp, modules.pricefeed.getInterval()) &&  modules.pricefeed.getLastUpdateId() >= add(requests[id].atUpdateId, 2))
  */

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');

  ensure(status.toNumber() === 0, "Request is not active anymore.")

  receipt = await sendTransaction(
    fundContract,
    'executeRequest',
    [id],
    environment,
  );
  executeRequestLogEntry = findEventInLog('Created', receipt);


  return toReadable(
    config,
    executeRequestLogEntry.params.shareQuantity.value,
    config.quoteAssetSymbol,
  );
};

export default executeRequest;
