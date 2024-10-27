import { ACTION_TYPE } from './action-type';

export const loadHotelAsync =
  (requestServer, id, startDate, endDate) => (dispatch) =>
    requestServer('fetchHotel', id, startDate, endDate).then(({ res: hotel }) =>
      dispatch({ type: ACTION_TYPE.SET_HOTEL, payload: hotel })
    );
