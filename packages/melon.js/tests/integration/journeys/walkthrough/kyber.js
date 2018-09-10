import BigNumber from 'bignumber.js';
import getQuoteAssetSymbol from '../../../../lib/pricefeeds/calls/getQuoteAssetSymbol';
import getPrice from '../../../../lib/pricefeeds/calls/getPrice';
import getConfig from '../../../../lib/version/calls/getConfig';
import signTermsAndConditions from '../../../../lib/version/transactions/signTermsAndConditions';
import setupFund from '../../../../lib/version/transactions/setupFund';
import getNativeAssetSymbol from '../../../../lib/version/calls/getNativeAssetSymbol';
import hasRecentPrice from '../../../../lib/pricefeeds/calls/hasRecentPrice';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';
import getOrderbook from '../../../../lib/exchange/calls/getOrderbook';
import getConversionRate from '../../../../lib/exchange/calls/getConversionRate';
import getKyberProxyContract from '../../../../lib/exchange/contracts/getKyberProxyContract';
import importWalletFromMnemonic from '../../../../lib/utils/wallet/importWalletFromMnemonic';
import setEnvironment from '../../../../lib/utils/environment/setEnvironment';
import getEnvironment from '../../../../lib/utils/environment/getEnvironment';
import getFundForManager from '../../../../lib/version/calls/getFundForManager';
import shutDownFund from '../../../../lib/fund/transactions/shutDownFund';
import getVersionContract from '../../../../lib/version/contracts/getVersionContract';
import transferTo from '../../../../lib/assets/transactions/transferTo'
import swapTokens from '../../../../lib/fund/transactions/swapTokens';
import swapTokensFromAccount from '../../../../lib/exchange/transactions/swapTokensFromAccount';


const randomString = (length = 4) =>
    Math.random()
        .toString(36)
        .substr(2, length);

fit('swapTokens from account', async () => {
  const { providerType, api } = await getParityProvider();

  const wallet = importWalletFromMnemonic('dinosaur pulse rice lumber machine entry tackle off require draw edge almost');

  setEnvironment({ api, account: wallet, providerType });
  const environment = getEnvironment();
  const config = await getConfig(environment);

  const srcAmount = new BigNumber(1000);
  const [, slippageRate] = await getConversionRate(environment, {srcTokenSymbol: "MLN-T", destTokenSymbol: "ANT-T", srcAmount});
  const expectedDestAmount = srcAmount.mul(slippageRate).div(10 ** 18);

  const actualDestAmount = await swapTokensFromAccount(environment, {srcTokenSymbol: "MLN-T", srcAmount: srcAmount, destTokenSymbol: "ANT-T", minConversionRate: slippageRate});

  expect(Number(actualDestAmount)).toBeGreaterThan(
      Number(expectedDestAmount),
  );

},   10 * 60 * 1000);
