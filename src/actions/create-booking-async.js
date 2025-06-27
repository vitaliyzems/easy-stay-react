import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const createBookingAsync = (bookingData) => (dispatch) =>
  request(`${API_BASE_URL}/api/bookings`, METHOD.POST, bookingData)
    .then(({ data: booking }) => {
      dispatch({ type: ACTION_TYPE.SET_BOOKING, payload: booking });
      return booking;
    })
    .catch((error) => {
      console.error('Booking failed:', error);
      throw error;
    });
