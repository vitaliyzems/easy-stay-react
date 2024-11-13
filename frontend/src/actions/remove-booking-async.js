import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const removeBookingAsync = (bookingId) => (dispatch) => {
  request(`/api/bookings/${bookingId}`, METHOD.DELETE).then(({ data }) => {
    if (data.success) {
      dispatch({ type: ACTION_TYPE.REMOVE_BOOKING, payload: bookingId });
    }
  });
};
