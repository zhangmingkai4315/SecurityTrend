import { combineReducers } from 'redux';
// import Auth from './authReducer';
import securityTrends from './securityTrendsReducers';

export default combineReducers({
  securityTrends,
});
