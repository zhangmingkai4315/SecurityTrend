import { combineReducers } from 'redux';
// import Auth from './authReducer';
import securityTrends from './securityTrendsReducers';
import setting from './settingReducers';

export default combineReducers({
  securityTrends,
  setting,
});
