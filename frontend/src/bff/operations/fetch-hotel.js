import { getHotel, getHotelBookings, getHotelRooms } from '../api';
import { filterAvailableRooms } from '../utils';

export const fetchHotel = async (hotelId, startDate, endDate) => {
  const hotel = await getHotel(hotelId);
  const hotelRooms = await getHotelRooms(hotelId);
  const hotelBookings = await getHotelBookings(hotelId);

  const availableRooms = filterAvailableRooms(
    hotelRooms,
    hotelBookings,
    startDate,
    endDate
  );

  return {
    error: null,
    res: { ...hotel, rooms: availableRooms },
  };
};
