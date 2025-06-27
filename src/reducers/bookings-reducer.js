import { ACTION_TYPE } from '../actions';

const initialBookingsState = {
  userBookings: [],
};

export const bookingsReducer = (
  state = initialBookingsState,
  { type, payload }
) => {
  switch (type) {
    case ACTION_TYPE.SET_USER_BOOKINGS:
      return { ...state, userBookings: payload };
    case ACTION_TYPE.REMOVE_BOOKING:
      return {
        ...state,
        userBookings: state.userBookings.filter(({ id }) => id !== payload),
      };

    default:
      return state;
  }
};
