import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const loadUserBookingsAsync = (userId) => (dispatch) => {
  request(`api/bookings?userId=${userId}`).then(({ data: userBookings }) =>
    dispatch({ type: ACTION_TYPE.SET_USER_BOOKINGS, payload: userBookings })
  );
};
