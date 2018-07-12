// @flow
import getOlympiadContract from '../contracts/getOlympiadContract';
import getVersionContract from '../../version/contracts/getVersionContract';

/**
 * @return Boolean on competition status
 */
const isCompetitionActive = async (environment): Promise<any> => {
  const olympiadContract = await getOlympiadContract(environment);
  const versionContract = await getVersionContract(environment);

  const isActiveCompetition = await olympiadContract.instance.isCompetitionActive.call();
  const isShutDownVersion = await versionContract.instance.isShutDown.call();
  return isActiveCompetition && !isShutDownVersion;
};

export default isCompetitionActive;
