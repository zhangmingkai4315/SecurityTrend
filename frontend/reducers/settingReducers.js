import _ from 'lodash';
import * as Types from '../types';

const INITIAL_STATE = { tabSelected: 0 };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SWITCH_TAB_NUMBER:
      return { ...state, tabSelected: action.payload };
    default:
      return state;
  }
};
