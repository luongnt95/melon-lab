import { types } from '../actions/orderbook';
import mergeReducer from '../utils/mergeReducer';

export const initialState = {
  selectedOrders: null,
};

export const reducer = mergeReducer(initialState, types);

export default reducer;
