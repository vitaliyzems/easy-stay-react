import { ACTION_TYPE } from './action-type';

export const createBookingAsync =
  (requestServer, ...bookingData) =>
  (dispatch) =>
    requestServer('bookRoom', ...bookingData).then(({ res: booking }) => {
      dispatch({ type: ACTION_TYPE.SET_BOOKING, payload: booking });
    });
