import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const loadPreview = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPE.SET_HOTELS_LOADING, payload: true });

  try {
    const [hotelsResponse, commentsResponse] = await Promise.all([
      request('/api/hotels/random'),
      request('/api/comments/random'),
    ]);

    const hotels = hotelsResponse.data;
    const comments = commentsResponse.data;

    dispatch({
      type: ACTION_TYPE.SET_PREVIEW,
      payload: { hotels, comments },
    });
  } catch (error) {
    throw error;
  }
};
