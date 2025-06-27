import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const editCommentAsync = (commentId, content) => (dispatch) =>
  request(`${API_BASE_URL}/api/comments/${commentId}`, METHOD.PATCH, {
    content,
  })
    .then(({ data: updatedComment }) => {
      dispatch({ type: ACTION_TYPE.EDIT_COMMENT, payload: updatedComment });
      return updatedComment;
    })
    .catch((error) => {
      console.error('Editing comment failed:', error);
      throw error;
    });
