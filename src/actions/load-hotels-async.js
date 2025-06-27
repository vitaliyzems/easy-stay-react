import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const loadHotelsAsync = (startDate, endDate) => (dispatch) => {
  dispatch({ type: ACTION_TYPE.SET_HOTELS_LOADING, payload: true });
  request(
    `${API_BASE_URL}/api/hotels?startDate=${startDate}&endDate=${endDate}`
  ).then(({ data: hotels }) =>
    dispatch({ type: ACTION_TYPE.SET_HOTELS, payload: hotels })
  );
};
