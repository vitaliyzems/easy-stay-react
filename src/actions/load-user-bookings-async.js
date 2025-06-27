import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const loadUserBookingsAsync = (userId) => (dispatch) => {
  request(`${API_BASE_URL}/api/bookings?userId=${userId}`).then(
    ({ data: userBookings }) =>
      dispatch({ type: ACTION_TYPE.SET_USER_BOOKINGS, payload: userBookings })
  );
};
