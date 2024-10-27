import { getUser } from '../api';
import { sessions } from '../sessions';

export const signIn = async (authEmail, authPassword) => {
  const user = await getUser(authEmail);

  if (!user) {
    return {
      error: 'Такой пользователь не найден',
      res: null,
    };
  }

  const { id, login, password, name, roleId } = user;

  if (authPassword !== password) {
    return {
      error: 'Неверный пароль',
      res: null,
    };
  }

  return {
    error: null,
    res: {
      id,
      login,
      name,
      roleId,
      session: sessions.create(user),
    },
  };
};
