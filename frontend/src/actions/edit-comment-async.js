import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const editCommentAsync = (commentId, content) => (dispatch) =>
  request(`/api/comments/${commentId}`, METHOD.PATCH, { content })
    .then(({ data: updatedComment }) => {
      dispatch({ type: ACTION_TYPE.EDIT_COMMENT, payload: updatedComment });
      console.log(updatedComment);
      return updatedComment;
    })
    .catch((error) => {
      console.error('Editing comment failed:', error);
      throw error;
    });
