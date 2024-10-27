import { BASE_URL } from '../constants';
import { transformUser } from '../transformers';

export const getUser = async (emailToFind) =>
  await fetch(`${BASE_URL}users?email=${emailToFind}`)
    .then((loadedUsers) => loadedUsers.json())
    .then(([loadedUser]) => loadedUser && transformUser(loadedUser));
