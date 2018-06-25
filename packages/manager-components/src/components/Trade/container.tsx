import { withState } from 'recompose';
import Trade from './index';

const withActiveTabState = withState('activeTabIndex', 'setTabIndex', 0);

export default (withActiveTabState)(Trade);
