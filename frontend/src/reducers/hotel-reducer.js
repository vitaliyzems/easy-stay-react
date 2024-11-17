import { ACTION_TYPE } from '../actions';

const initialHotelState = {
  id: null,
  name: null,
  address: null,
  imageUrl: null,
  rooms: [],
  comments: [],
  loading: false,
};

export const hotelReducer = (state = initialHotelState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_HOTEL_LOADING:
      return { ...state, loading: payload };
    case ACTION_TYPE.SET_HOTEL:
      return { ...state, ...payload, loading: false };
    case ACTION_TYPE.RESET_HOTEL:
      return initialHotelState;
    case ACTION_TYPE.SET_COMMENT:
      return { ...state, comments: [payload, ...state.comments] };
    case ACTION_TYPE.EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((commment) =>
          commment.id === payload.id ? { ...payload, ...commment } : commment
        ),
      };
    case ACTION_TYPE.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(({ id }) => id !== payload),
      };

    default:
      return state;
  }
};
