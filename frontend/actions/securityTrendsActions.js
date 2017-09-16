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

function startFetch() {
  return {
    type: Types.FETCH_TRENDS_START,
  };
}
export function changeTypeId(id) {
  return {
    type: Types.CHANGE_FETCH_TRENDS_Type,
    payload: id,
  };
}
function updatePageViewSuccess(id) {
  return {
    type: Types.UPDATE_PAGE_VIEW_SUCCESS,
    payload: id,
  };
}

function updatePageViewFail(error) {
  return {
    type: Types.UPDATE_PAGE_VIEW_FAIL,
    payload: error,
  };
}

export const addTrendsPageView = (id = null) => {
  return (dispatch) => {
    if (id === false) {
      return;
    }
    fetch(`http://localhost:3000/api/trends/${id}/pageview`, {
      method: 'PUT',
    }).then(response => response.json())
      .then(() => dispatch(updatePageViewSuccess(id)))
      .catch(error => dispatch(updatePageViewFail(error)));
  };
};


export const securityTrendsFetch = (refresh = false, typeId = '') => {
  return (dispatch, getState) => {
    dispatch(startFetch());
    if (refresh === false) {
      const pageNumber = getState().securityTrends.page || 1;
      if (getState().securityTrends.full) {
        dispatch(fetchFail('已获取所有信息'));
        return;
      }
      fetch(`http://localhost:3000/api/trends?type_id=${typeId}&page=${pageNumber}`)
        .then(response => response.json())
        .then(data => dispatch(fetchTrendsSuccess({ data: data.data, append: true })))
        .catch(error => dispatch(fetchFail(error)));
    } else {
      fetch(`http://localhost:3000/api/trends?type_id=${typeId}&page=1`)
        .then(response => response.json())
        .then(data => dispatch(fetchTrendsSuccess({ data: data.data, append: false })))
        .catch(error => dispatch(fetchFail(error)));
    }
  };
};
