import { ROLE } from '../../constants';
import { deleteBooking } from '../api';
import { sessions } from '../sessions';

export const removeBooking = async (hash, bookingId) => {
  const accessRoles = [ROLE.ADMIN, ROLE.USER];
  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Доступ запрещён',
      res: null,
    };
  }

  await deleteBooking(bookingId);

  return {
    error: null,
    res: true,
  };
};
