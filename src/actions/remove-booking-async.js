import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const removeBookingAsync = (bookingId) => (dispatch) => {
  request(`${API_BASE_URL}/api/bookings/${bookingId}`, METHOD.DELETE).then(
    ({ data }) => {
      if (data.success) {
        dispatch({ type: ACTION_TYPE.REMOVE_BOOKING, payload: bookingId });
      }
    }
  );
};
