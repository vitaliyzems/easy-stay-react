import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const loadHotelsAsync = (startDate, endDate) => (dispatch) => {
  dispatch({ type: ACTION_TYPE.SET_HOTELS_LOADING, payload: true });
  request(`/api/hotels?startDate=${startDate}&endDate=${endDate}`).then(
    ({ data: hotels }) =>
      dispatch({ type: ACTION_TYPE.SET_HOTELS, payload: hotels })
  );
};
