import _ from 'lodash';
import * as Types from '../types';

const INITIAL_STATE = { securityTrends: [], page: 1, listWaiting: false, error: '', full: false };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_TRENDS_SUCCESS: {
      const page = (action.payload.data.length > 0 ? state.page + 1 : state.page);
      let securityTrends = [];
      if (action.payload.append) {
        securityTrends = [...state.securityTrends, ...action.payload.data];
      } else {
        const newTrends = _.differenceBy(action.payload.data, state.securityTrends,'id')
        securityTrends = [...newTrends, ...state.securityTrends];
      }
      return {
        ...state,
        page,
        full: (action.payload.data.length === 0),
        securityTrends,
        listWaiting: true,
      };
    }
    case Types.FETCH_TRENDS_START:
      return { ...state, listWaiting: true };
    case Types.FETCH_TRENDS_FAIL:
      return { ...state, listWaiting: true, error: '获取新消息失败' };
    case Types.UPDATE_PAGE_VIEW_SUCCESS:
      return { ...state,
        securityTrends: state.securityTrends.map((trend) => {
          if (trend.id === action.payload) {
            trend.pageview = (trend.pageview || 0) + 1;
          }
          return trend;
        }),
      };
    case Types.UPDATE_PAGE_VIEW_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
