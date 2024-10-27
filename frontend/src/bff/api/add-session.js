import { BASE_URL } from '../constants';

export const addSession = (hash, user) =>
  fetch(`${BASE_URL}sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ hash, user }),
  });
