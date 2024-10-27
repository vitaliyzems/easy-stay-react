import { ACTION_TYPE } from '../actions';

const initialHotelState = {
  id: null,
  name: null,
  address: null,
  imageUrl: null,
  rooms: [],
};

export const hotelReducer = (state = initialHotelState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_HOTEL:
      return { ...state, ...payload };
    case ACTION_TYPE.RESET_HOTEL:
      return initialHotelState;

    default:
      return state;
  }
};
