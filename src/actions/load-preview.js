import { formatDate, request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const loadPreview = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPE.SET_HOTELS_LOADING, payload: true });

  const today = new Date();
  const startDate = formatDate(today.getTime());

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const endDate = formatDate(tomorrow.getTime());

  try {
    const [hotelsResponse, commentsResponse] = await Promise.all([
      request(
        `${API_BASE_URL}/api/hotels/random?startDate=${startDate}&endDate=${endDate}`
      ),
      request(`${API_BASE_URL}/api/comments/random`),
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
