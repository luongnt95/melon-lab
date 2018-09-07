import { toBigNumber } from './functionalBigNumber';

const displayNumber = number =>
  toBigNumber(number).toFixed(4);

export default displayNumber;
