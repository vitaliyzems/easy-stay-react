import { getBookings, getHotels, getRooms } from '../api';
import { filterAvailableRooms } from '../utils';

export const fetchHotels = async (
  startDate,
  endDate,
  searchPhrase,
  page,
  limit
) => {
  const hotels = await getHotels(searchPhrase, page, limit);
  const bookings = await getBookings();

  if (!startDate || !endDate) {
    return {
      error: null,
      res: hotels,
    };
  }

  const rooms = await getRooms();
  const availableRooms = filterAvailableRooms(
    rooms,
    bookings,
    startDate,
    endDate
  );
  const availableHotels = hotels.filter((hotel) =>
    availableRooms.some((room) => room.hotelId === hotel.id)
  );

  return {
    error: null,
    res: availableHotels,
  };
};
