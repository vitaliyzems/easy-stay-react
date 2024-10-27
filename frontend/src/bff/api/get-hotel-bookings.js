import { BASE_URL } from '../constants';
import { transformBooking } from '../transformers/transform-booking';

export const getHotelBookings = (hotelId) =>
  fetch(`${BASE_URL}bookings?hotel_id=${hotelId}`)
    .then((loadedBookings) => loadedBookings.json())
    .then((bookings) => bookings.map(transformBooking));
