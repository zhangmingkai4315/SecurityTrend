import { Actions } from 'react-native-router-flux';
import * as Types from '../types';

export function fetchTrendsSuccess(payload) {
  return {
    type: Types.FETCH_TRENDS_SUCCESS,
    payload,
  };
}
function fetchFail(payload) {
  return {
    type: Types.FETCH_FAIL,
    payload,
  };
}
export const securityTrendsFetch = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/trends')
      .then(response => response.json())
      .then(data => dispatch(fetchTrendsSuccess(data.data)))
      .catch(error => dispatch(fetchFail(error)));
  };
};
