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

  const srcAmount = 0.1;
  const [, slippageRate] = await getConversionRate(environment, {srcTokenSymbol: "WETH-T", destTokenSymbol: "DAI-T", srcAmount});
  const expectedDestAmount = srcAmount * slippageRate;

  const actualDestAmount = await swapTokensFromAccount(environment, {srcTokenSymbol: "WETH-T", srcAmount: srcAmount, destTokenSymbol: "DAI-T", minConversionRate: slippageRate});

  expect(Number(actualDestAmount.params.actualDestAmount.value)).toBeGreaterThan(
      expectedDestAmount,
  );

},   10 * 60 * 1000);

fit('Create fund, swapTokens through it', async () => {

  const environment = getEnvironment();
  const config = await getConfig(environment);

  const signature = await signTermsAndConditions(environment);
  const shared = {};

  shared.fundName = randomString();
  const versionContract = await getVersionContract(environment);
  let managerToFunds = await versionContract.instance.managerToFunds.call(
      {},
      [environment.account.address],
  );

  if (managerToFunds !== '0x0000000000000000000000000000000000000000') {
      shared.fund = {address: managerToFunds};
  }
  else {
    shared.fund = await setupFund(environment, {
        name: shared.fundName,
        signature,
        exchangeNames: ['KyberNetwork'],
    });
  }

  const srcAmount = 0.1;
  const destAmount = 10;

  await transferTo(environment, { symbol: "WETH-T", toAddress: shared.fund.address, quantity: srcAmount });
  const eventLog = await swapTokens(environment, { fundAddress: shared.fund.address, exchangeAddress: "0x7e6b8b9510D71BF8EF0f893902EbB9C865eEF4Df",  srcTokenSymbol: 'WETH-T',
      destTokenSymbol: 'DAI-T',
      srcAmount: srcAmount,
      destAmount: destAmount });

  expect(Number(eventLog.params.actualDestAmount.value)).toBeGreaterThan(
      destAmount,
  );

},   10 * 60 * 1000);
