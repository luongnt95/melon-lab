import { compose, withHandlers, withState } from 'recompose';
import GenerateWallet from './index';

const enhance = compose(
  withState('page', 'setPage', props => {
    return props.page ? props.page : 0;
  }),
  withHandlers({
    nextPage: props => () => {
      props.setPage(props.page + 1);
    },
    prevPage: props => () => {
      props.setPage(props.page - 1);
    },
  }),
);

export default enhance(GenerateWallet);
