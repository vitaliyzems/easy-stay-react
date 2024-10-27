import { ACTION_TYPE } from '../actions';

const initialHotelsState = {
  hotels: [],
};

export const hotelsReducer = (
  state = initialHotelsState,
  { type, payload }
) => {
  switch (type) {
    case ACTION_TYPE.SET_HOTELS:
      return { ...state, hotels: payload };

    default:
      return state;
  }
};
