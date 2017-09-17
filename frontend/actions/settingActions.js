import { Actions } from 'react-native-router-flux';
import * as Types from '../types';

export function switchTabNumber(payload) {
  return {
    type: Types.SWITCH_TAB_NUMBER,
    payload,
  };
}
