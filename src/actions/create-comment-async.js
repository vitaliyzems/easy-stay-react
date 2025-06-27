import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const createCommentAsync = (content, hotelId, userId) => (dispatch) =>
  request(`${API_BASE_URL}/api/comments`, METHOD.POST, {
    content,
    hotelId,
    userId,
  })
    .then(({ data: newComment }) => {
      dispatch({ type: ACTION_TYPE.SET_COMMENT, payload: newComment });
    })
    .catch((error) => {
      console.error('Creating comment failed:', error);
      throw error;
    });
