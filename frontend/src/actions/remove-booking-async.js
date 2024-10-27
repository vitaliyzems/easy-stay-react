import { ACTION_TYPE } from './action-type';

export const removeBookingAsync = (requestServer, bookingId) => (dispatch) => {
  requestServer('removeBooking', bookingId).then(({ res }) => {
    if (res) {
      dispatch({ type: ACTION_TYPE.REMOVE_BOOKING, payload: bookingId });
    }
  });
};
