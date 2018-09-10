// @flow
import KyberProxyAbi from '@melonproject/smart-contracts/out/formatted/exchange/thirdparty/kyber/KyberNetworkProxy.abi.json';
import getConfig from '../../version/calls/getConfig';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Get deployed SimpleMarket contract instance
 */
const getKyberProxyContract = async (environment: Environment) => {
  const config = await getConfig(environment);
  return environment.api.newContract(
    KyberProxyAbi,
    "0x7e6b8b9510D71BF8EF0f893902EbB9C865eEF4Df",
  );
};

export default getKyberProxyContract;
