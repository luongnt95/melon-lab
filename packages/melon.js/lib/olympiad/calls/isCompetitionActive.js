// @flow
import getOlympiadContract from '../contracts/getOlympiadContract';

/**
 * @return Boolean on competition status
 */
const isCompetitionActive = async (environment): Promise<any> => {
  const olympiadContract = await getOlympiadContract(environment);

  const isActive = await olympiadContract.instance.isCompetitionActive.call();
  return isActive;
};

export default isCompetitionActive;
