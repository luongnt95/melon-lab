import { withState } from 'recompose';
import compose from 'recompose/compose';
import Trade from './index';

const withActiveTabState = withState('activeTabIndex', 'setTabIndex', 0);

export default compose(withActiveTabState)(Trade);
