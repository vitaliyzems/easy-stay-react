import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const loadHotelsAsync = (startDate, endDate) => (dispatch) =>
  request(`/api/hotels?startDate=${startDate}&endDate=${endDate}`).then(
    ({ data: hotels }) =>
      dispatch({ type: ACTION_TYPE.SET_HOTELS, payload: hotels })
  );
