import * as Types from '../types';
const INITIAL_STATE = { securityTrends: [] };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_TRENDS_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};
