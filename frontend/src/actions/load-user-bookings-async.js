import { ACTION_TYPE } from './action-type';

export const loadUserBookingsAsync = (requestServer, userId) => (dispatch) => {
  requestServer('fetchUserBookings', userId).then(({ res: userBookings }) =>
    dispatch({ type: ACTION_TYPE.SET_USER_BOOKINGS, payload: userBookings })
  );
};
