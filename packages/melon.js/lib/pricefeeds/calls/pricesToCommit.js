// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';

const pricesToCommit = async (environment, addresses): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.pricesToCommit.call({}, [
    addresses,
  ]);
};

export default pricesToCommit;
