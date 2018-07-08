import { types } from '../actions/trade';
import mergeReducer from '../utils/mergeReducer';

export const initialState = {
  orderType: 'Buy',
  exchange: '',
  price: '',
  quantity: '',
  total: '',
  strategy: 'Market',
};

export const reducer = mergeReducer(initialState, types);

export default reducer;
