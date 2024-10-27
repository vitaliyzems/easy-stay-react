import { ROLE } from '../../constants';
import { getHotels, getRooms, getUserBookings } from '../api';
import { sessions } from '../sessions';

export const fetchUserBookings = async (hash, userId) => {
  const accessRoles = [ROLE.ADMIN, ROLE.USER];
  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Доступ запрещён',
      res: null,
    };
  }

  const userBookings = await getUserBookings(userId);
  const hotels = await getHotels();
  const rooms = await getRooms();

  const bookings = userBookings.map(({ hotelId, roomId, ...booking }) => {
    const hotel = hotels.find(({ id }) => id === hotelId);
    const room = rooms.find(({ id }) => id === roomId);
    return { ...booking, hotel, room };
  });

  return {
    error: null,
    res: bookings,
  };
};
