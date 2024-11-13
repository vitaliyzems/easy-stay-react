import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const removeCommentAsync = (commentId) => (dispatch) => {
  request(`/api/comments/${commentId}`, METHOD.DELETE).then(({ data }) => {
    if (data.success) {
      dispatch({ type: ACTION_TYPE.REMOVE_COMMENT, payload: commentId });
    }
  });
};
