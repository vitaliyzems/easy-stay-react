import { ACTION_TYPE } from '../actions';

const initialHotelsState = {
  hotels: [],
  randomComments: [],
  loading: false,
};

export const hotelsReducer = (
  state = initialHotelsState,
  { type, payload }
) => {
  switch (type) {
    case ACTION_TYPE.SET_HOTELS:
      return { ...state, hotels: payload, loading: false };
    case ACTION_TYPE.SET_HOTELS_LOADING:
      return { ...state, loading: payload };
    case ACTION_TYPE.SET_PREVIEW:
      return {
        ...state,
        hotels: payload.hotels,
        randomComments: payload.comments,
        loading: false,
      };

    default:
      return state;
  }
};
