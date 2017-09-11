import { Actions } from 'react-native-router-flux';
import * as Types from '../types';


function fetchTrendsSuccess() {
  return {
    type: Types.FETCH_TRENDS_SUCCESS,
  };
}

export const securityTrendsFetch = () =>{
  return (dispatch) => {
    firebase.database().ref(`/user/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        console.log(snapshot)
        dispatch(fetchTrendsSuccess(snapshot.val()));
      });
  };
}