import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const loadHotelAsync = (id, startDate, endDate) => (dispatch) => {
  dispatch({ type: ACTION_TYPE.SET_HOTEL_LOADING, payload: true });

  request(
    `${API_BASE_URL}/api/hotels/${id}?startDate=${startDate}&endDate=${endDate}`
  ).then(({ data: hotel }) =>
    dispatch({ type: ACTION_TYPE.SET_HOTEL, payload: hotel })
  );
};
