import { BASE_URL } from '../constants';
import { transformBooking } from '../transformers/transform-booking';

export const getUserBookings = (userId) => {
  return fetch(`${BASE_URL}bookings?user_id=${userId}`)
    .then((loadedBookings) => loadedBookings.json())
    .then((bookings) => bookings.map(transformBooking));
};
