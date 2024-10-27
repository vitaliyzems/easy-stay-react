import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const signUp = async (regEmail, regPassword, regName) => {
  const existedUser = await getUser(regEmail);

  if (existedUser) {
    return {
      error: 'Такой логин уже занят',
      res: null,
    };
  }

  const user = await addUser(regEmail, regPassword, regName);

  return {
    error: null,
    res: {
      id: user.id,
      login: user.login,
      name: user.name,
      roleId: user.role_id,
      session: sessions.create(user),
    },
  };
};
