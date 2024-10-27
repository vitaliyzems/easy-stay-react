import { BASE_URL } from '../constants';

export const addUser = (email, password, name) =>
  fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      registed_at: new Date().toLocaleString(),
      role_id: 2,
    }),
  }).then((createdUser) => createdUser.json());
