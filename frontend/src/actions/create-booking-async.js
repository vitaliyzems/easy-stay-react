import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const createBookingAsync = (bookingData) => (dispatch) =>
  request('/api/bookings', METHOD.POST, bookingData)
    .then(({ data: booking }) => {
      dispatch({ type: ACTION_TYPE.SET_BOOKING, payload: booking });
      return booking;
    })
    .catch((error) => {
      console.error('Booking failed:', error);
      throw error;
    });
