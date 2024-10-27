import { ROLE } from '../../constants';
import { addBooking } from '../api';
import { sessions } from '../sessions';

export const bookRoom = async (hash, ...bookingData) => {
  const accessRoles = [ROLE.ADMIN, ROLE.USER];
  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Доступ запрещён',
      res: null,
    };
  }

  console.log(bookingData);

  const booking = await addBooking(...bookingData);

  return {
    error: null,
    res: booking,
  };
};
