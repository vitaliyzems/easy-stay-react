import { ACTION_TYPE } from '../actions';

const initialBookingState = {
  booking: null,
};

export const bookingReducer = (
  state = initialBookingState,
  { type, payload }
) => {
  switch (type) {
    case ACTION_TYPE.SET_BOOKING:
      return { ...state, booking: payload };
    default:
      return state;
  }
};
