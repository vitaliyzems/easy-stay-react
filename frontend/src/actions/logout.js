import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const logout = () => {
  request('/api/logout', METHOD.POST);

  return { type: ACTION_TYPE.LOGOUT };
};
