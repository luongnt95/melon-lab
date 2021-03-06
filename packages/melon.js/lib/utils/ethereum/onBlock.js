import getAccountAddress from '../environment/getAccountAddress';
import getBalance from '../../assets/calls/getBalance';
import getConfig from '../../version/calls/getConfig';
import hasRecentPrice from '../../pricefeeds/calls/hasRecentPrice';
import resolvePromiseObject from '../generic/resolvePromiseObject';
import toReadable from '../../assets/utils/toReadable';

const onBlock = async environment => {
  const config = await getConfig(environment);
  const isDataValid = await hasRecentPrice(environment);
  const accountAddress = getAccountAddress(environment);

  const info = await resolvePromiseObject({
    syncing: environment.api.eth
      .syncing()
      .then(syncing => (syncing ? !!syncing.result : syncing)),
    isDataValid,
  });

  const accountInfo = accountAddress
    ? await resolvePromiseObject({
        etherBalance: environment.api.eth
          .getBalance(accountAddress)
          .then(balance =>
            toReadable(config, balance, config.nativeAssetSymbol),
          ),
        melonBalance: getBalance(environment, {
          tokenSymbol: config.melonAssetSymbol,
          ofAddress: accountAddress,
        }),
        wethBalance: getBalance(environment, {
          tokenSymbol: config.nativeAssetSymbol,
          ofAddress: accountAddress,
        }),
      })
    : {};

  return {
    ...info,
    ...accountInfo,
  };
};

export default onBlock;
