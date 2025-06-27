import { METHOD } from '../constants';
import { request } from '../utils';
import { ACTION_TYPE } from './action-type';
import { API_BASE_URL } from './api-base-url';

export const logout = () => {
  request(`${API_BASE_URL}/api/logout`, METHOD.POST);

  return { type: ACTION_TYPE.LOGOUT };
};
