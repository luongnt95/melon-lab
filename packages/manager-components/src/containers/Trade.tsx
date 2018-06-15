import { withState } from 'recompose';
import compose from 'recompose/compose';

const withActiveTabState = withState('activeTabIndex', 'setTabIndex', 0);

export default compose(withActiveTabState);
