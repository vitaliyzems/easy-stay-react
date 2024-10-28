import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const loadHotelAsync = (id, startDate, endDate) => (dispatch) =>
  request(`/api/hotels/${id}?startDate=${startDate}&endDate=${endDate}`).then(
    ({ data: hotel }) =>
      dispatch({ type: ACTION_TYPE.SET_HOTEL, payload: hotel })
  );
