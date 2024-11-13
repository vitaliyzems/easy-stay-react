import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const createCommentAsync = (content, hotelId, userId) => (dispatch) =>
  request('/api/comments', METHOD.POST, { content, hotelId, userId })
    .then(({ data: newComment }) => {
      dispatch({ type: ACTION_TYPE.SET_COMMENT, payload: newComment });
    })
    .catch((error) => {
      console.error('Creating comment failed:', error);
      throw error;
    });
